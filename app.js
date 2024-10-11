const $ = (el) => document.querySelector(el);

const ticTacToe = $(".container");
const restartBtn = $(".restart");
const winnerBtn = $(".winner");

let isPlayingX = true;
let winner = null;

const getCurrentBoard = () =>
  Array.from({ length: 9 }, (_, index) => $(`.box-${index + 1}`).innerHTML);

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
    winner = isPlayingX ? "X" : "O";
  }
}

ticTacToe.addEventListener("click", (ev) => {
  if (!!winner) return;
  if (ev.target.innerHTML == "") {
    if (ev.target.classList.contains("box") && isPlayingX) {
      ev.target.innerHTML = "X";
    } else if (ev.target.classList.contains("box") && !isPlayingX) {
      ev.target.innerHTML = "O";
    }
  }

  checkWinner();

  if (!!winner) {
    winnerBtn.innerHTML = `El jugador ${isPlayingX ? "X" : "O"} ha ganado!`;
    winnerBtn.style.display = "block";
  }

  isPlayingX = !isPlayingX;
});

// esconde el botón de victoria y reiniciamos el juego
restartBtn.addEventListener("click", () => {
  winnerBtn.style.display = "none";
  winner = null;
  isPlayingX = true;

  // limpiamos el tablero para iniciar una partida nueva
  const boardArray = Array.from({ length: 9 }, (_, index) => index + 1);
  boardArray.forEach((index) => {
    $(`.box-${index}`).innerHTML = "";
  });
});
