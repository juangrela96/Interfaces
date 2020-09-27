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
fotocasillerovacio.onload = cargarTablero;

let fichas;
let fichaimg = new Image();
fichaimg.src = './imagenes/ficha1.png';
fichaimg.onload = generateFichas;

let tablero;
function clearCanvas(){
  let imageAspectRatio = (1.0 * fondo.height) / fondo.width;
  let imageScaledWidth = canvas.width;
  let imageScaledHeight = canvas.width * imageAspectRatio;
  canvas.width = imageScaledWidth;
  canvas.height = imageScaledHeight;
  context.drawImage(fondo, 0, 0, imageScaledWidth, imageScaledHeight);
}

function cargarTablero(){
  tablero = new Tablero(10,10,fotocasillerovacio);
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
  fichas = new Array(10);
  let posXinicial = 40;
  let posYinicial = 50;
  for (let i = 0; i < fichas.length; i++) {
    fichas[i] = new Ficha(posXinicial,posYinicial,context,fichaimg,"red",20,"red");
    fichas[i].draw();
    posYinicial += 50;
  }
}

function limpiar(){
  clearCanvas();
  tablero.draw();
}

function drawFichas(){
  limpiar();
  for (let i = 0; i < fichas.length; i++) {
    fichas[i].draw();
  }

}

function findClickedFigure(x,y) { //Chequea si clickee una figura
  for (let i = 0; i < fichas.length; i++) {
    if (fichas[i].isPointInside(x,y)) {
      return fichas[i];
    }
  }
}

let lastClickedFigure = null;
let isMouseDown = false;

canvas.addEventListener('mousedown',onMouseDown,false); //ESTOS LISTENER NO SE SI VAN ACA
canvas.addEventListener('mouseup',onMouseUp,false);
canvas.addEventListener('mousemove',onMouseMoved,false);

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
