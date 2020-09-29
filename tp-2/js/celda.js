class Celda extends Figure {
  constructor(posX,posY,context,imagen,enuso,col,fil){
    super(posX,posY,context,imagen);
    this.width = 50;
    this.height = 50;
    this.enuso=enuso;
    this.ficha=null;
    this.col = col;
    this.fil = fil;
  }
  draw(){
    this.context.rect(this.posX, this.posY, this.width, this.height);
    this.context.drawImage(this.imagen, this.posX, this.posY);
  }
  setFicha(ficha){
    this.ficha=ficha;
  }
  getFicha(){
    return this.ficha;
  }
  getCol(){
    return this.col;
  }
  getFil(){
    return this.fil;
  }
}
