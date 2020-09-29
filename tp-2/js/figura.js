class Figure{
  constructor(posX, posY, context,imagen) {
    this.posX = posX;
    this.posY = posY;
    //this.img = new Image()
    this.imagen = new Image();
    //this.imagen.src = imagen;
    this.imagen = imagen;
    this.context = context;
    //let pat = context.createPattern(img.src,'no-repeat');
    }

  getPosX(){
    return this.posX;
  }
  getPosY(){
    return this.posY;
  }

}
