const $ = (el) => document.querySelector(el);

const ticTacToe = $(".container");
const restartBtn = $(".restart");
const winnerBtn = $(".winner");
const currentPlayer = $(".current-player");

let isPlayingX = true;
let winner = null;

const X_PLAYER_LABEL = "x";
const O_PLAYER_LABEL = "o";

function initGame() {
  isPlayingX = true;
  winnerBtn.style.display = "none";
  winner = null;
  currentPlayer.innerHTML =
    (isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL) + " playing";
  restartBtn.style.outline = "none";

  // limpiamos el tablero para iniciar una partida nueva
  const boardArray = Array.from({ length: 9 }, (_, index) => index + 1);
  boardArray.forEach((index) => {
    $(`.box-${index}`).innerHTML = "";
  });
}

function getCurrentBoard() {
  return Array.from(
    { length: 9 },
    (_, index) => $(`.box-${index + 1}`).innerHTML
  );
}

function handleClickOnCell(ev) {
  if (!!winner) return;
  const target = ev.target;
  if (target.innerHTML != "") return;
  if (target.classList.contains("box"))
    target.innerHTML = isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL;

  checkWinner();

  if (!!winner) {
    winnerBtn.innerHTML = `${
      isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL
    } won!`;
    winnerBtn.style.display = "block";
    currentPlayer.style.display = "none";
  }

  isPlayingX = !isPlayingX;
  currentPlayer.innerHTML =
    (isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL) + " playing";
}

function checkWinner() {
  const cells = getCurrentBoard();

  const noWinner = cells.every((cell) => !!cell);
  if (noWinner) {
    restartBtn.style.outline = "3px solid #48e";
  }

  if (
    (cells[0] && cells[0] === cells[1] && cells[0] === cells[2]) ||
    (cells[3] && cells[3] === cells[4] && cells[3] === cells[5]) ||
    (cells[6] && cells[6] === cells[7] && cells[6] === cells[8]) ||
    (cells[0] && cells[0] === cells[3] && cells[0] === cells[6]) ||
    (cells[1] && cells[1] === cells[4] && cells[1] === cells[7]) ||
    (cells[2] && cells[2] === cells[5] && cells[2] === cells[8]) ||
    (cells[0] && cells[0] === cells[4] && cells[0] === cells[8]) ||
    (cells[2] && cells[2] === cells[4] && cells[2] === cells[6])
  ) {
    winner = isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL;
    restartBtn.style.outline = "3px solid #48e";
  }
}

/* Click on the cells */
ticTacToe.addEventListener("click", handleClickOnCell);
/* Restart game */
restartBtn.addEventListener("click", () => initGame());

/* init game */
initGame();
