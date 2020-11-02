/* let carrusel=document.querySelector(".escenas");

window.onscroll = function() {
  console.log("Vertical: " + window.scrollY);
  let altura = window.scrollY;
  console.log(altura);
  if (altura>1100){
    carrusel.style.marginLeft+=20+"%";
  }
  else {
    carrusel.style.marginLeft-=20+"%";
  }
};
*/
let actores = document.querySelector("#actores");
let carrusel = document.querySelector("#carrusel");
let eventos = document.querySelectorAll(".accordion");
let carga = document.querySelector(".carga");
let calendario = document.querySelector(".eventos");
let inputnombre = document.querySelector("#nombre");
let form = document.querySelector(".form");
let binicio = document.querySelector("#binicio").addEventListener("click",function(){
  document.querySelector("#pagina").scrollIntoView(true);
});
let bevento = document.querySelector("#beventos").addEventListener("click",function(){
  document.querySelector("#calendarioeven").scrollIntoView(true);
});
let bmensaje = document.querySelector("#bmensajes").addEventListener("click",function(){
  document.querySelector("#formulario").scrollIntoView(true);
});
let bactores = document.querySelector("#bactores").addEventListener("click",function(){
  document.querySelector("#actores").scrollIntoView(true);
});
let bescenas = document.querySelector("#bescenas").addEventListener("click",function(){
  document.querySelector("#carrusel").scrollIntoView(true);
});
/*let imagenes = document.querySelector(".fotoevent");

for (let i = 0; i < imagenes.length; i++) {
  imagenes[i].addEventListener("mousemove",moverImagen);
}
function moverImagen(e){
  let ancho = this.width;
  let alto = this.height;
  let x = e.offsetX;
  let y = e.offsetY;
  let xlado = (imagenes.innerWidth / 2 - e.pageX) / 20;
  let ylado = (imagenes.innerWidth / 2 - e.pageY) / 10;
  imagenes.style.transform = "rotateY(${-1*xlado}deg) rotateX(${ylado}deg)";
  imagenes.style.transition = "transform 0.1s linear";
} */

window.addEventListener('scroll', () => {
  let scroll = window.scrollY;
  document.body.style.setProperty('--scroll',scroll);
}, false);

window.onload = function(){
  document.querySelector(".carga").scrollIntoView(true);
  setTimeout(removeLoad,3000);
}
window.onscroll = function(){
  let altura  = window.scrollY;
  console.log(altura);
  if (altura < 1000 && actores.classList.contains("mostrar")) {
    ocultarElemento(actores);
  }
  else if (altura > 1200 && altura <=2086 && !actores.classList.contains("mostrar")) {
    mostrarElemento(actores,15);
    if (carrusel.classList.contains("mostrar")) {
      ocultarElemento(carrusel);
    }
  }
  else if (altura > 2100 && altura <2500) {
    ocultarElemento(actores);
    mostrarElemento(carrusel,15);
    if (calendario.classList.contains("mostrar")) {
      ocultarElemento(calendario);
    }
  }
  else if (altura > 2700 && altura<3200 && !carrusel.classList.contains("mostrar")) {
    mostrarElemento(carrusel,15);
    if (calendario.classList.contains("mostrar")) {
      ocultarElemento(calendario);
    }
  }
  else if (altura > 3300 && carrusel.classList.contains("mostrar")) {
    ocultarElemento(carrusel);
    if (calendario.classList.contains("mostrar")) {
      ocultarElemento(calendario);
    }
  }
  else if (altura < 3900 && calendario.classList.contains("mostrar") ) {
    ocultarElemento(calendario);
  }
  else if (altura > 4000 && !calendario.classList.contains("mostrar") && altura < 5400) {
    mostrarElemento(calendario,25);
  }
  else if (altura > 5400 && calendario.classList.contains("mostrar")) {
    ocultarElemento(calendario);
  }
  else if (altura > 5400 && altura < 6000 ) {
    mostrarElemento(form,30);
  }
  else if (altura < 6000 && form.classList.contains("mostrar")) {
    ocultarElemento(form);
  }
}


/*inputnombre.addEventListener("click",function(){
  inputnombre.classList.add("setColor");
});*/

function removeLoad(){
  let pagina = document.querySelector("#pagina");
  carga.classList.add("invisible");
  pagina.classList.remove("invisible");
}

function mostrarElemento(elemento,margin){
  elemento.classList.remove("invisible");
  elemento.classList.add("mostrar");
  elemento.classList.remove("ocultar");
  elemento.style.marginLeft=margin+"%"
}

function ocultarElemento(elemento){
  elemento.classList.remove("mostrar");
  elemento.classList.add("ocultar");
  elemento.style.marginLeft=-100+"%"
}


for (let i = 0; i < eventos.length; i++) {
  eventos[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

//RELOOOOOOOOOOOJ
function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = '01/01/2021';
initializeClock('clockdiv', deadline);
