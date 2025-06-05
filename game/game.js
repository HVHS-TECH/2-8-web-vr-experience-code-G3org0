
let wallCords = 6

let scale = {
  xMult: 1, 
  yMult: 0.9090900177208052, 
  zMult: 0.9999998437456502,
  xPlac: 12,
  yPlac: 2}

const wallPlacment = ([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ], 
    [3, 4], 
    [5, 6], 
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]
]);

console.log(wallPlacment.length)

const SCENE = document.querySelector('a-scene');

window.addEventListener('DOMContentLoaded', () => {
    createWalls(); 
});

function createWalls(){
    for (let row = 0; row < wallPlacment.length; row++){
        for (let coloumn = 0; coloumn < wallPlacment[row].length; coloumn++ ){
            let rot = false;
            if ((row/2) % 1 == 0.5){
                rot = true;
            }
            
            //console.log(wallPlacment[row][coloumn])
            createWall(wallPlacment[row][coloumn], row)
            //console.log(row)
           // console.log(wallPlacment[row]);
        }
    }
    //createWall(wallCords, 0); 
}

    
function createWall(xCord, zCord){
    //console.log("runnin createWall");
    const WALL = document.createElement('a-gltf-model');
    WALL.setAttribute('src','#wall1');
    WALL.setAttribute('position', `${xCord*scale.xPlac} 0 ${zCord*scale.xPlac}`);
    WALL.setAttribute('scale', `${scale.xMult} ${scale.yMult} ${scale.zMult}`);
    SCENE.appendChild(WALL);
}







//const model = document.querySelector('#wallingAway');
//
//model.addEventListener('model-loaded', () => {
//  const mesh = model.getObject3D('mesh');
//  if (!mesh) return;
//
//  const box = new THREE.Box3().setFromObject(mesh);
//  const size = new THREE.Vector3();
//  box.getSize(size);
//
//  console.log('Model size:', size); // size.x, size.y, size.z
//  console.log(12 / size.x)
//  console.log(2 / size.y)
//});