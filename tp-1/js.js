//get component references
let canvas = document.querySelector('.canvas1');
let context = canvas.getContext('2d');
let paint = false;
let lazo = "lapiz";
let image;
let imageData;
let imageAspectRatio;
let imageScaledWidth;
let imageScaledHeight;
let r;
let g;
let b;

limpiar();

function startPosition(){
  paint = true;

}

function finishPosition(){
  paint = false;
  context.beginPath();
}

function draw(e){
   if(!paint) return;
   if (lazo=="lapiz") {
     context.strokeStyle="#000000";

   }
  if (lazo=="borrador") {
    context.strokeStyle="#FFFFFF";
  }
  context.lineWidth = 10;
  context.lineCap = "round";
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  context.beginPath();
  context.moveTo(e.offsetX, e.offsetY);
}


function pincel(){
  lazo = "lapiz";
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw);
}

function goma(){
  lazo = "borrador";
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw);
}

function getR(x,y){
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
}

function getG(x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
}

function getB(x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
}

function limpiar(){
  context.fillStyle = "#FFFFFF"; // canvas background color
  context.fillRect(0, 0, canvas.width, canvas.height);
  image=null;
}

function subir(){
  let input = document.querySelector('#input1');
  input.click();
  // when click OK in the File Dialog
  input.onchange = e => {
      limpiar();
      // getting a hold of the file reference
      let file = e.target.files[0];

      // setting up the reader
      reader = new FileReader();
      reader.readAsDataURL(file); // this is reading as data url

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
          let content = readerEvent.target.result; // this is the content!

          image = new Image();
          //image.crossOrigin = 'Anonymous';

          image.src = content;

          image.onload = function () {
               imageAspectRatio = (1.0 * this.height) / this.width;
               imageScaledWidth = canvas.width;
               imageScaledHeight = canvas.width * imageAspectRatio;

              // draw image on canvas
              context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

              // get imageData from content of canvas
          }
      }
  }
}

function original(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
}

function prueba(){ //ANDAAAAAAAAAA
              imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

              // modify imageData
              for (let j = 0; j < imageData.height; j++) {
                  for (let i = 0; i < imageData.width; i++) {
                      if (i % 2 == 0) {
                          let index = (i + imageData.width * j) * 4;
                          imageData.data[index + 0] = 0;
                          imageData.data[index + 1] = 0;
                          imageData.data[index + 2] = 0;
                      }
                  }
              }

              // draw the modified image
              context.putImageData(imageData, 0, 0);
            }

function negativo(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r = getR(x,y);
        g = getG(x,y);
        b = getB(x,y);
        imageData.data[index + 0] = 255-r;
        imageData.data[index + 1] = 255-g;
        imageData.data[index + 2] = 255-b;
      }
    }
    context.putImageData(imageData, 0, 0);
  }

function grises(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r=getR(x,y);
        g=getG(x,y);
        b=getB(x,y);
        prom=(r+g+b)/3;
        imageData.data[index + 0] = prom;
        imageData.data[index + 1] = prom;
        imageData.data[index + 2] = prom;
      }
    }
    context.putImageData(imageData, 0, 0);
}

function sepia(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r=getR(x,y);
        g=getG(x,y);
        b=getB(x,y);
        imageData.data[index + 0] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        imageData.data[index + 1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        imageData.data[index + 2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
      }
    }
    context.putImageData(imageData, 0, 0);
}

function binario() {
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r=getR(x,y);
        g=getG(x,y);
        b=getB(x,y);
        let prom= r+g+b;
        if (prom<=382) {
          imageData.data[index + 0] = 0;
          imageData.data[index + 1] = 0;
          imageData.data[index + 2] = 0;
        }
        else {
          imageData.data[index + 0] = 255;
          imageData.data[index + 1] = 255;
          imageData.data[index + 2] = 255;
        }
      }
    }
    context.putImageData(imageData, 0, 0);
  }

function blur(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 1; x < imageData.width-1; x++) {
      for (let y = 1; y < imageData.height-1; y++) {
        r = ((getR(x-1,y-1)+getR(x-1,y)+getR(x-1,y+1)+getR(x,y-1)+getR(x,y)+getR(x,y+1)+getR(x+1,y+1)+getR(x+1,y)+getR(x+1,y-1))/9);
        g = ((getG(x-1,y-1)+getG(x-1,y)+getG(x-1,y+1)+getG(x,y-1)+getG(x,y)+getG(x,y+1)+getG(x+1,y+1)+getG(x+1,y)+getG(x+1,y-1))/9);
        b = ((getB(x-1,y-1)+getB(x-1,y)+getB(x-1,y+1)+getB(x,y-1)+getB(x,y)+getB(x,y+1)+getB(x+1,y+1)+getB(x+1,y)+getB(x+1,y-1))/9);
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
      }
    }
    context.putImageData(imageData, 0, 0);
}
function masSaturacion(){
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  let hsl;
  let rgb;
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r = getR(x,y);
        g = getG(x,y);
        b = getB(x,y);
        hsl = rgbToHsl(r,g,b);
        hsl[1] = 1;
        rgb = hslToRgb(hsl[0],hsl[1],hsl[2]);
        imageData.data[index + 0] = rgb[0];
        imageData.data[index + 1] = rgb[1];
        imageData.data[index + 2] = rgb[2];
      }
    }
    context.putImageData(imageData, 0, 0);
}
function rgbToHsl(r, g, b) {
  r =r/255;
  g =g/255;
  b =b/255;
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b);
  let h
  let s
  let l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  }
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
   h /= 6;
 }
 return [h, s, l];
}
function hslToRgb(h, s, l) {
  if (s == 0) {
    r = g = b = l;
  } else {
      function gorgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = gorgb(p, q, h + 1 / 3);
      g = gorgb(p, q, h);
      b = gorgb(p, q, h - 1 / 3);
  }
return [r * 255, g * 255, b * 255];
}

document.querySelector("#goma").addEventListener("click",goma);
document.querySelector("#pincel").addEventListener("click",pincel);
document.querySelector("#subir").addEventListener("click",subir);
document.querySelector("#limpiar").addEventListener("click",limpiar);
document.querySelector("#original").addEventListener("click",original);
document.querySelector("#negativo").addEventListener("click",negativo);
document.querySelector("#binario").addEventListener("click",binario);
document.querySelector("#sepia").addEventListener("click",sepia);
document.querySelector("#grises").addEventListener("click",grises);
document.querySelector("#blur").addEventListener("click",blur)
document.querySelector("#massaturacion").addEventListener("click",masSaturacion);
