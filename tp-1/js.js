//get component references
let canvas = document.querySelector('.canvas1');
let context = canvas.getContext('2d');
let image;
let imageAspectRatio;
let imageScaledWidth;
let imageScaledHeight;
limpiar();

function limpiar(){
  context.fillStyle = "#FFFFFF"; // canvas background color
  context.fillRect(0, 0, canvas.width, canvas.height);
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
              let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

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
  let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let j = 0; j < imageData.height; j++) {
      for (let i = 0; i < imageData.width; i++) {
        let index = (i + imageData.width * j) * 4;
        let r=imageData.data[index + 0];
        let g=imageData.data[index + 1];
        let b=imageData.data[index + 2];
        imageData.data[index + 0] = 255-r;
        imageData.data[index + 1] = 255-g;
        imageData.data[index + 2] = 255-b;
      }
    }
    context.putImageData(imageData, 0, 0);
  }
function binario(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let j = 0; j < imageData.height; j++) {
      for (let i = 0; i < imageData.width; i++) {
        let index = (i + imageData.width * j) * 4;
        let r=imageData.data[index + 0];
        let g=imageData.data[index + 1];
        let b=imageData.data[index + 2];
        let prom=(r+g+b)/3;
        imageData.data[index + 0] = prom;
        imageData.data[index + 1] = prom;
        imageData.data[index + 2] = prom;
      }
    }
    context.putImageData(imageData, 0, 0);
}

document.querySelector("#subir").addEventListener("click",subir);
document.querySelector("#limpiar").addEventListener("click",limpiar);
document.querySelector("#original").addEventListener("click",original);
document.querySelector("#negativo").addEventListener("click",negativo);
document.querySelector("#binario").addEventListener("click",binario);
