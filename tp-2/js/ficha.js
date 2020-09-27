class Ficha extends Figure {
  constructor(posX,posY,context,imagen,color,radius,highlightedStyle) {
    super(posX,posY,context,imagen);
    this.color = color;
    this.radius = radius;
    this.highlighted = false; //booleano que indica si esta selecionada
    this.highlightedStyle = highlightedStyle;

  }
/*draw(){
    let pat = this.context.createPattern(this.imagen,'repeat');
    this.context.beginPath();
    this.context.arc(this.posX,this.posY,this.radius,0,2 * Math.PI);
    this.context.fillStyle=pat;
    this.context.fill();
    this.context.closePath();
  } */

    draw(){
        let imgX = this.posX - this.radius;
        let imgY = this.posY - this.radius;
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.context.fill();
        if (this.highlighted === true) {
          this.context.strokeStyle = this.highlightedStyle;
          this.context.lineWidth = 5;
          this.context.stroke();
        }
        this.context.drawImage(this.imagen, imgX, imgY,40,40);
        this.context.closePath();
}
  getRadius(){
    return this.radius;
  }

  setHighlighted(boolean){
    this.highlighted = boolean;
  }

  isPointInside(x,y){
    let _x = this.posX - x;
    let _y = this.posY - y;
    return Math.sqrt(_x * _x + _y * _y) < this.radius;
  }
  setPosition(x,y){
    this.posX = x;
    this.posY = y;
  }
}
