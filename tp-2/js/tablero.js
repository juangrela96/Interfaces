class Tablero {
  constructor(filas,columnas,imagen) {
    this.filas=filas;
    this.columnas=columnas;
    this.imagen = new Image();
    this.imagen = imagen;
    this.matriz;
    this.caida;
  }
  draw(){
    let posX=250;
    let posY=50;
    this.matriz = new Array(this.columnas);
    for (let i = 0; i < this.columnas; i++) {
      this.matriz[i] = new Array(this.filas);
    }
    for (let c = 0; c < this.columnas; c++) {
      for (var f = 0; f < this.filas; f++) {
        this.matriz[c][f] = new Celda(posX,posY,context,this.imagen,false);
        this.matriz[c][f].draw();
        if (f==this.columnas-1) {
          posY += 50;
          posX = 250;
        }
        else {
          posX += 50;
        }
      }
    }
  }
}
