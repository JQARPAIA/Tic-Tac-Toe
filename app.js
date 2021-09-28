const ticTacToe = document.querySelector(".container");
const restartGame = document.querySelector(".btn");
let playerX = true;
let playerO  = false;

ticTacToe.addEventListener("click", (ev)=>{
    if (ev.target.innerHTML == ""){
        if (ev.target.classList.contains("box") && playerX == true){
            ev.target.innerHTML = "X";
            playerX = false;
            playerO = true;
        } else if (ev.target.classList.contains("box") && playerO == true){
            ev.target.innerHTML = "O";
            playerX = true;
            playerO = false;
        }
    }
})

restartGame.addEventListener("click", (ev)=>{
    // convierte el elemento container en el array
    let restart = ticTacToe.childNodes; 
    for (let ind = 1; ind < restart.length; ind++){
        // filtramos los elementos text intermedios a los elementos jugables
        if (restart[ind].childNodes.length != 0){
            // limpiamos los elementos jugables para iniciar una partida nueva
            restart[ind].innerHTML = "";
        }
    }
})

/* Faltan las validaciones de escenarios victorias o empate, puntajes, mejorar diseño */
