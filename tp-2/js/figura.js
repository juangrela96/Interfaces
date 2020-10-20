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


  setFill(fill){
    this.fill = fill;
  }
  getPosition(){
    return{
      x : this.getPosX(),
      y : this.getPosY()
    };
  }
  getPosX(){
    return this.posX;
  }
  getPosY(){
    return this.posY;
  }
  getFill(){
    return this.fill;
  }
  getImg(){
    return img;
  }
  setImg(img){
    this.imagen.src = img;
    pat = this.context.createPattern(img,"no-repeat");
  }
//  draw(){
//    this.context.createPattern(this.imagen,'no-repeat');
//  }
}
