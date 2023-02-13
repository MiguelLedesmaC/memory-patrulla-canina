//iniciar variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 3800000;
let timerInicial = 30;
let tiempoRegresivo = null;

//audio
let inicioAudio = new Audio("./sounds/inicio.mp3");
let chaseAudio = new Audio("./sounds/frase chase.mp3");
let destapaAudio = new Audio("./sounds/destapa.wav");
let rightAudio = new Audio("./sounds/right.wav");

//apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let buttons = document.querySelectorAll('button')

let buttonsSelected = [];
buttons.forEach(element => {
  buttonsSelected.push(element.id);
})

//generacion numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);
//funciones
function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivo);
      mostrarTiempo.innerHTML = `Tiempo terminado`;
      bloquearTarjetas();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img class="imagen_destapada" src="./images/${numeros[i]}.png" alt="imagen patrulla">`;
    tarjetaBloqueada.disabled = true;
  }
}

//inicioAudio.play();
//funcion principal
function destapar(id) {
  tarjetasDestapadas++;
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }


  if (tarjetasDestapadas == 1) {
    destapaAudio.play();
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    console.log(tarjeta1);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img class="imagen_girada" src="./images/${primerResultado}.png" alt = "imagen patrulla">`;
    if(primerResultado == 5 || primerResultado == 8) {
      tarjeta1.innerHTML = `<img class="imagen_girada rubble" src="./images/${primerResultado}.png" alt = "imagen patrulla">`;
    }
    tarjeta1.classList.add('loop-card');
    
    //desabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    
    tarjeta2.innerHTML = `<img class="imagen_girada2" src="./images/${segundoResultado}.png" alt="imagen patrulla">`;
    if(segundoResultado == 5 || segundoResultado == 8) {
      tarjeta2.innerHTML = `<img class="imagen_girada2 rubble" src="./images/${segundoResultado}.png" alt="imagen patrulla">`;
    }
    tarjeta2.classList.add('loop-card');
    //desabilitar segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos ${movimientos}`;
    if(segundoResultado != primerResultado){      
      tarjeta1.classList.remove('loop-card');
      tarjeta2.classList.remove('loop-card');
      console.log(tarjeta2.classList);
      console.log(tarjeta1.classList);

    }
    if (primerResultado == segundoResultado) {
      rightAudio.play();
      //encerar tarjetas destapadas
      tarjetasDestapadas = 0;

      //aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos : ${aciertos}`;

      //Modal Ganador
      let winGame = document.querySelector('.finish')
      console.log(winGame.style.display);
      if (aciertos == 8) {
        winGame.style.display = 'block';
        
      }
    } else {
      //mostrar momentaneamente valores y volver a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 1000);
    }
  }
}
