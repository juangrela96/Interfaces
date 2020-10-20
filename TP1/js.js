const filas=100;
const cols=100;

let mat=[];
for (let f = 0; f < filas; f++) {
  mat[f]=[];
  for (let c = 0; c < cols; c++) {
    mat[f][c]=Math.floor(Math.random() * 1000);
  }
}
console.table(mat);

function unoa(){
  let max=mat[1][1]
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < cols; c++) {
      if (mat[f][c]>max) {
        max=mat[f][c];
      }
    }
  }
  console.log("el numero maximo es"+max);
}

function unob(){

}
