class Tablero {
  constructor(filas,columnas) {
    this.filas=filas;
    this.columnas=columnas;
    this.posicion = (canvas.width-50*columnas)/2;
    this.caidas = new Array(columnas);
    this.matriz = new Array(columnas);
    this.ganador=null;
    for (let c = 0; c < columnas; c++) {
      this.matriz[c] = [];
      this.caidas[c] = new Caida(this.posicion+50*c,context);
      for (let f = 0; f < filas; f++) {
        this.matriz[c][f] = new Celda(this.posicion+50*c,100+50*f,context,fotocasillerovacio,false,c,f);
      }
    }
  }

  /* cargarArrays(){
    this.posicion = (canvas.width-50*col)/2;
    this.caidas = new Array(this.columnas);
    this.matriz = new Array(this.columnas);
    for (let c = 0; c < columnas; c++) {
      this.caidas[c] = new Caida(posicion+50*c);
      this.matriz[c] = [];
    }
    for (let f = 0; f < filas; f++) {
      this.matriz[c][f] = new Celda(posicion+50*c,50+50*f,context,this.imagen,false);
    }
  }
*/
  draw(){
    for (let c = 0; c < this.columnas; c++) {
      this.caidas[c].draw();
      for (let f = 0; f < this.filas; f++) {
        this.matriz[c][f].draw();
      }
    }
  }
/*  draw(){
    let posX=250;
    let posY=50;
    let posXCaida = posX;
    this.caidas = new Array(this.columnas);
    for (let i = 0; i < this.caidas.length; i++) {
      this.caidas[i] = new Caida(posXCaida,context);
      this.caidas[i].draw();
      posXCaida += 50;
    }
    this.matriz = new Array(this.columnas);
    for (let i = 0; i < this.columnas; i++) {
      this.matriz[i] = new Array(this.filas);
    }
    for (let c = 0; c < this.columnas; c++) {
      for (let f = 0; f < this.filas; f++) {
        this.matriz[f][c] = new Celda(posX,posY,context,this.imagen,false);
        this.matriz[f][c].draw();
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
  */
  getCaidas(){
    return this.caidas;
  }
  tirarFicha(columna){
    for (let i = this.filas-1; i >= 0; i--) {
      let celdaactual = this.matriz[columna][i];
      if (celdaactual.getFicha() == null) {
        return celdaactual;
      }
    }
  }
  checkganador(celdaactual){
    let color = celdaactual.getFicha().getColor();
    let columnaactual = celdaactual.getCol();
    let filaactual = celdaactual.getFil();
    let cantfichas = 0;
    if (filaactual<this.filas-3) { //CHEQUEA PARA ABAJO
      cantfichas=0;
      for (let i = filaactual; i < this.filas; i++) {
        if (this.matriz[columnaactual][i].getFicha().getColor()==color) {
          cantfichas++;
          if (cantfichas==4) {
            if (color=="blue") {
              this.ganador="Jugador 1";
            }
            else {
              this.ganador="Jugador 2";
            }
            return true;
          }
        }
      }
    }
    if(columnaactual>=3) { //CHEQUEA DERECHA
      cantfichas=0;
      for (let i = columnaactual; i >= 0; i--) {
        if (this.matriz[i][filaactual].getFicha() != null) {
          if (this.matriz[i][filaactual].getFicha().getColor()==color) {
            cantfichas++;
            if (cantfichas==4) {
              if (color=="blue") {
                this.ganador="Jugador 1";
              }
              else {
                this.ganador="Jugador 2";
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
    if(columnaactual<this.columnas-3) { //CHEQUEA izquierda
      cantfichas=0;
      for (let i = columnaactual; i < this.columnas; i++) {
        if (this.matriz[i][filaactual].getFicha () != null) {
          if (this.matriz[i][filaactual].getFicha().getColor()==color) {
            cantfichas++;
            if (cantfichas==4) {
              if (color=="blue") {
                this.ganador="Jugador 1";
              }
              else {
                this.ganador="Jugador 2";
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
    if (filaactual<this.filas-3 && columnaactual>=3) { //chequea diagonal izquierda
      cantfichas = 0;
      let colaux = columnaactual;
      for (let i = filaactual ; i < this.filas; i++) {
        if(this.matriz[colaux][i].getFicha() != null){
          if(this.matriz[colaux][i].getFicha().getColor()==color){
            cantfichas++;
            colaux--;
            if (cantfichas==4) {
              if (color=="blue") {
                this.ganador="Jugador 1";
              }
              else {
                this.ganador="Jugador 2";
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
    if (filaactual<this.filas-3 && columnaactual<this.columnas-3) {
      cantfichas = 0;
      let colaux = columnaactual;
      for (let i = filaactual ; i < this.filas; i++) {
        if(this.matriz[colaux][i].getFicha() != null){
          if(this.matriz[colaux][i].getFicha().getColor()==color){
            cantfichas++;
            colaux++;
            if (cantfichas==4) {
              if (color=="blue") {
                this.ganador="Jugador 1";
              }
              else {
                this.ganador="Jugador 2";
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
  }
  getGanador(){
    return this.ganador;
  }
}
