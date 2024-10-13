const $ = (el) => document.querySelector(el);

/* Constants */
const ticTacToe = $(".container");
const restartBtn = $(".restart");
const winnerBtn = $(".winner");
const currentPlayer = $(".current-player");
const gameInfo = $(".game-info");
const X_PLAYER_LABEL = "❌";
const O_PLAYER_LABEL = "⭕️";
const TAP_SOUND = new Audio("./assets/sounds/tap.mp3");

/* Variables */
let isPlayingX = true;
let winner = null;
let xPlayerScore = 0;
let oPlayerScore = 0;
let ties = 0;

function updateScore() {
  gameInfo.innerHTML = `
  <div class="score-container">
    <p class="score">${X_PLAYER_LABEL} <span>${xPlayerScore}</span></p>
    <p class="score">${O_PLAYER_LABEL} <span>${oPlayerScore}</span></p>
  </div>
  <p class="score ties">TIES: ${ties}</p>
  `;
}

function initGame() {
  isPlayingX = true;
  winnerBtn.style.display = "none";
  winner = null;
  currentPlayer.style.display = "block";
  currentPlayer.innerHTML =
    (isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL) + " playing";
  restartBtn.style.outline = "none";
  restartBtn.style.background = "#0a0";

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
  if (target.classList.contains("box")) {
    target.innerHTML = isPlayingX ? X_PLAYER_LABEL : O_PLAYER_LABEL;
    TAP_SOUND.play();
  }

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
    xPlayerScore = isPlayingX ? xPlayerScore + 1 : xPlayerScore;
    oPlayerScore = isPlayingX ? oPlayerScore : oPlayerScore + 1;
    updateScore();
    restartBtn.style.outline = "3px solid #48e";
    restartBtn.style.background = "#48e";
    return;
  }

  const noWinner = cells.every((cell) => !!cell);
  if (noWinner) {
    restartBtn.style.outline = "3px solid #48e";
    restartBtn.style.background = "#48e";
    ties += 1;
    winnerBtn.innerHTML = `TIE`;
    winnerBtn.style.display = "block";
    currentPlayer.style.display = "none";
    updateScore();
    return;
  }
}

/* Click on the cells */
ticTacToe.addEventListener("click", handleClickOnCell);
/* Restart game */
restartBtn.addEventListener("click", initGame);

/* init game */
initGame();
