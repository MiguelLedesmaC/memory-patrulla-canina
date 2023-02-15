//iniciar variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempoRegresivo = null;

let minutos = 10;
let minutosIniciales = 10;
let segundos = 00;
let segundosIniciales = 59;



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


// inicioAudio.play();
//generacion numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
// console.log(numeros);
//funciones

function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    if(minutos == 0 && segundos == 0){
      clearInterval(tiempoRegresivo);
      bloquearTarjetas();
    }else if(segundos == 0){
      minutos--;
      segundos = 59
    }else{
      segundos--;
    }
    mostrarTiempo.innerHTML = `Tiempo <span class="stats__stat">${minutos}:${segundos < 10 ?'0' + segundos:segundos} </span>`;
  }, 1000);
  
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img class="imagen_destapada" src="./images/${numeros[i]}.png" alt="imagen patrulla">`;
    tarjetaBloqueada.disabled = true;
  }
}


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
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img class="imagen_girada" src="./images/${primerResultado}.png" alt = "imagen patrulla">`;
    if(primerResultado == 5 || primerResultado == 8 || primerResultado == 1) {
      tarjeta1.innerHTML = `<img class="imagen_girada equal_size" src="./images/${primerResultado}.png" alt = "imagen patrulla">`;
    }
    tarjeta1.classList.add('loop-card');
    
    //desabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    
    tarjeta2.innerHTML = `<img class="imagen_girada2" src="./images/${segundoResultado}.png" alt="imagen patrulla">`;
    if(segundoResultado == 5 || segundoResultado == 8 || segundoResultado == 1) {
      tarjeta2.innerHTML = `<img class="imagen_girada2 equal_size" src="./images/${segundoResultado}.png" alt="imagen patrulla">`;
    }
    tarjeta2.classList.add('loop-card');
    //desabilitar segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos  <span class="stats__aciertos__span">${movimientos}</span> `;
    if(segundoResultado != primerResultado){      
      tarjeta1.classList.remove('loop-card');
      tarjeta2.classList.remove('loop-card');
    }
    if (primerResultado == segundoResultado) {
      rightAudio.play();
      //encerar tarjetas destapadas
      tarjetasDestapadas = 0;

      //aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos <span class="stats__aciertos__span" >${aciertos}</span> `;

      //Modal Ganador
      let winGame = document.querySelector('.finish')
      console.log(winGame.style.display);
      if (aciertos == 8) {
        clearInterval(tiempoRegresivo)
        mostrarTiempo.innerHTML = `Logrado en:  <span class="stats__stat">${(minutosIniciales - minutos - 1)}:${segundosIniciales - segundos + 1 } </span>`;
        winGame.style.display = 'block';

        // Confetti
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
          var timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
        
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

// instalamos la extension de confetti con npm 
//cuando se hace click en button, recorremos un numero de veces aleatorio y sacamos confetti
// document.querySelector("#triggerConfetti").addEventListener("click", ()=> {
//   for (let index = 0; index < (Math.floor(Math.random() * 10) + 1) ; index++) {
//     confetti({
//       origin:{
//         x:Math.random() - 0.1,
//         y:Math.random() - 0.1,
//       }
//     })
//   }
// })
