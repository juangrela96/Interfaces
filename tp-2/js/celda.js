class Celda extends Figure {
  constructor(posX,posY,context,imagen,enuso){
    super(posX,posY,context,imagen);
    this.width = 50;
    this.height = 50;
    this.enuso=enuso;
    this.ficha=null;
  }
/*  draw(){ //ESTA FORMA ES LA VIEJA CON EL PATTERN Y ANDA
      let pat = this.context.createPattern(this.imagen,'repeat');
      this.context.rect(this.posX, this.posY, this.width, this.height);
      this.context.fillStyle=pat;
      this.context.fill();

    //this.context.clearRect(250, 100, 50, 100);
  }
*/
  draw(){
    this.context.rect(this.posX, this.posY, this.width, this.height);
    this.context.drawImage(this.imagen, this.posX, this.posY);
  }
}
