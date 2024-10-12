const $ = (el) => document.querySelector(el);

const ticTacToe = $(".container");
const restartBtn = $(".restart");
const winnerBtn = $(".winner");
const currentPlayer = $(".current-player");

let isPlayingX = true;
let winner = null;

const initGame = () => {
  currentPlayer.innerHTML = "Turno de " + (isPlayingX ? "X" : "O");
  winnerBtn.style.display = "none";
  winner = null;
  isPlayingX = true;
  restartBtn.style.outline = "none";

  // limpiamos el tablero para iniciar una partida nueva
  const boardArray = Array.from({ length: 9 }, (_, index) => index + 1);
  boardArray.forEach((index) => {
    $(`.box-${index}`).innerHTML = "";
  });
};

const getCurrentBoard = () =>
  Array.from({ length: 9 }, (_, index) => $(`.box-${index + 1}`).innerHTML);

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
    winner = isPlayingX ? "X" : "O";
    restartBtn.style.outline = "3px solid #48e";
  }
}

ticTacToe.addEventListener("click", (ev) => {
  if (!!winner) return;
  const target = ev.target;
  if (target.innerHTML != "") return;
  if (target.classList.contains("box"))
    target.innerHTML = isPlayingX ? "X" : "O";

  checkWinner();

  if (!!winner) {
    winnerBtn.innerHTML = `El jugador ${isPlayingX ? "X" : "O"} ha ganado!`;
    winnerBtn.style.display = "block";
  }

  isPlayingX = !isPlayingX;
  currentPlayer.innerHTML = "Turno de " + (isPlayingX ? "X" : "O");
});

// esconde el botón de victoria y reiniciamos el juego
restartBtn.addEventListener("click", () => initGame());
// initGame();
