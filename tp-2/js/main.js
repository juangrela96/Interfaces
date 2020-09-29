let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// let clickedfigure;
let fondo = new Image();
fondo.src = './imagenes/fondo1.jpg';
fondo.onload = clearCanvas;

let fotocasillerovacio = new Image();
fotocasillerovacio.src = './imagenes/casillerovacio.jpg';
//fotocasillerovacio.onload = cargarTablero;

let fichas;
let fichaimg = new Image();
fichaimg.src = './imagenes/ficha1.png';
//fichaimg.onload = generateFichas;



let jugadores = new Array(2);


let tablero;

function imprimirTurno(){
  if (jugadores[0].getTurno()==true) {
    context.textAlign="center";
    context.font="20pt Verdana";
    context.fillStyle = "blue";
    context.fillText("Turno jugador 1",500,30);
  }
  else {
    context.textAlign="center";
    context.font="20pt Verdana";
    context.fillStyle = "red";
    context.fillText("Turno jugador 2",500,30);
  }
}

function imprimirJugadores(){
  context.textAlign="center";

  context.font="20pt Verdana";
  context.fillStyle = "blue";
  context.fillText("Jugador 1",80,40);

  context.textAlign="center";

  context.font="20pt Verdana";
  context.fillStyle = "red";
  context.fillText("Jugador 2",930,40);
}


function newGame(){
  let filas = document.querySelector("#filas").value;
  let columnas = document.querySelector("#columnas").value;
  let cantfichas = parseInt((filas*columnas)/2);
  jugadores[0] = new Jugador(true,cantfichas,"blue",40);
  jugadores[1] = new Jugador(false,cantfichas,"red",canvasWidth-40);
  clearCanvas();
  cargarTablero(filas,columnas);
  generateFichas();
  imprimirJugadores();
  imprimirTurno();
  canvas.addEventListener('mousedown',onMouseDown,false); //ESTOS LISTENER NO SE SI VAN ACA
  canvas.addEventListener('mouseup',onMouseUp,false);
  canvas.addEventListener('mousemove',onMouseMoved,false);
}

function clearCanvas(){
  let imageAspectRatio = (1.0 * fondo.height) / fondo.width;
  let imageScaledWidth = canvas.width;
  let imageScaledHeight = canvas.width * imageAspectRatio;
  context.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}

function limpiarCanvas(){

}

function cargarTablero(filas,columnas){
  tablero = new Tablero(filas,columnas,fotocasillerovacio);
  tablero.draw();
}
/* function newTablero(){
let posX = 150; //columna
let posY = 50; //fila
let fotocasillerovacio = new Image();
fotocasillerovacio.src = './imagenes/casillerovacio.jpg';
fotocasillerovacio.onload = function(){
let tablero = new Array(5);
for (let i = 0; i < 5; i++) {
tablero[i] = new Array(5);
}
for (let c = 0; c < 5; c++) {
for (var f = 0; f < 5; f++) {
tablero[c][f] = new Celda(posX,posY,context,fotocasillerovacio,false);
tablero[c][f].draw();
if (f==4) {
posY += 50;
posX = 150;
}
else {
posX += 50;
}
}
}
}
} */

/* function addCasilleros(){

let posX = 0;
let posY = 500;
let fotocasillerovacio = new Image();
fotocasillerovacio.src = './imagenes/casillerovacio.jpg';
let casillero = new Celda(posX,posY,context,fotocasillerovacio,false);
fotocasillerovacio.onload = function(){
casillero.draw();
}
} */

function generateFichas(){
   /* fichas = new Array(10);
  let posXinicial = 40;
  let posYinicial = 50;
  for (let i = 0; i < fichas.length; i++) {
    fichas[i] = new Ficha(posXinicial,posYinicial,context,fichaimg,"red","red");
    fichas[i].draw();
    posYinicial += 50;
  }
  */
  jugadores[0].drawFichitas();
  jugadores[1].drawFichitas();
}

function limpiar(){
  clearCanvas();
  tablero.draw();
}

function drawFichas(){
  limpiar();
   /* for (let i = 0; i < fichas.length; i++) {
    fichas[i].draw();
  } */
  jugadores[0].drawFichitas();
  jugadores[1].drawFichitas();
  imprimirJugadores();
  imprimirTurno();
}

function findClickedFigure(x,y) { //Chequea si clickee una figura
  let fichasjugador;
  if (jugadores[0].getTurno()==true) {
    fichasjugador=jugadores[0].getFichas();
    for (let i = 0; i < fichasjugador.length; i++) {
      if (fichasjugador[i].isPointInside(x,y)){
        return fichasjugador[i];
      }
    }
  }
  else {
    fichasjugador=jugadores[1].getFichas();
    for (let i = 0; i < fichasjugador.length; i++) {
      if (fichasjugador[i].isPointInside(x,y)){
        return fichasjugador[i];
      }
    }
  }
  /*
  for (let i = 0; i < fichas.length; i++) {
    if (fichas[i].isPointInside(x,y)) {
      return fichas[i];
    }
  }
  */
}

let lastClickedFigure = null;
let isMouseDown = false;



function onMouseDown(event){
  isMouseDown = true;
  if (lastClickedFigure != null) {
    lastClickedFigure.setHighlighted(false);
    lastClickedFigure = null;
  }
  let clickedfigure = findClickedFigure(event.layerX, event.layerY);
  if (clickedfigure != null ) {
    clickedfigure.setHighlighted(true);
    lastClickedFigure = clickedfigure;
  }
  drawFichas();
}
function onMouseMoved(event){
  if (isMouseDown && lastClickedFigure != null) {
    lastClickedFigure.setPosition(event.layerX,event.layerY);
    drawFichas();
  }
}
function onMouseUp(event){
  isMouseDown = false;
  if (lastClickedFigure != null) {
    let posxficha = lastClickedFigure.getPosX();
    let posyficha = lastClickedFigure.getPosY();
    let caidas = tablero.getCaidas();
    let suma;
    suma = 250+49*10;
    if ((posyficha > 50 && posyficha < 95) && (posxficha>250 && posxficha<suma)) {
      for (let i = 0; i < caidas.length; i++) {
        if ((posyficha > 50 && posyficha   < 95) && (posxficha > caidas[i].getPosX() && posxficha < caidas[i].getPosX()+49)) {
          let celda=tablero.tirarFicha(i);
          if (celda != null) {
            celda.setFicha(lastClickedFigure);
            lastClickedFigure.setPosition(celda.getPosX()+25,celda.getPosY()+25);
            lastClickedFigure.setUso();
            if (tablero.checkganador(celda)==true) {

              console.log("hola");
            }
            if (jugadores[0].getTurno()==true) {
              jugadores[0].setTurno(false);
              jugadores[1].setTurno(true);
            }
            else {
              jugadores[1].setTurno(false);
              jugadores[0].setTurno(true);
            }
          }
          else {
            lastClickedFigure.setPosition(lastClickedFigure.getPosXOriginal(),lastClickedFigure.getPosYOriginal());
          }
        }
      }
    }
    else {
      lastClickedFigure.setPosition(lastClickedFigure.getPosXOriginal(),lastClickedFigure.getPosYOriginal());
    }
    drawFichas();
  }
  if (tablero.getGanador() != null) {
    clearCanvas();
    centerX = canvas.width/2;
		context.textAlign="center";

		context.font="60pt Verdana";
		context.fillStyle = "blue";
		context.fillText("GANADOR",centerX,60);

		context.font="40pt Verdana";
		context.strokeStyle="green";
		context.lineWidth = 2;
		context.strokeText(tablero.getGanador(),centerX,120);

    canvas.removeEventListener('mousedown',onMouseDown,false); //ESTOS LISTENER NO SE SI VAN ACA
    canvas.removeEventListener('mouseup',onMouseUp,false);
    canvas.removeEventListener('mousemove',onMouseMoved,false);
  }
}


 /* canvas.addEventListener('click', event => {
  if (lastClickedFigure != null) {
    lastClickedFigure.setHighlighted(false);
    lastClickedFigure = null;
  }
  clickedfigure = findClickedFigure(event.layerX, event.layerY);
  if (clickedfigure != null ) {
    clickedfigure.setHighlighted(true);
    lastClickedFigure = clickedfigure;
  }
  drawFichas();
}); */
document.querySelector("#jugar").addEventListener("click",newGame);
