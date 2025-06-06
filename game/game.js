
let wallCords = 6

let scale = {
  xMult: 1, 
  yMult: 0.9090900177208052, 
  zMult: 0.9999998437456502,
  xPlac: 12,
  yPlac: 2}

const wallPlacment = ([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
    [1, 11], 
    [2, 3, 4, 5, 6, 9], 
    [1, 2, 4, 5, 7, 8, 9, 11], 
    [2, 5, 9, 10],
    [1, 5, 6, 8, 10, 11], 
    [1, 2, 4, 6, 7],
    [1, 6, 9, 11],
    [2, 3, 4, 5, 7, 8, 9],
    [1, 2, 4, 7, 9, 11],
    [3, 4, 5, 6, 7, 10],
    [1, 6, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
]);

const PillerPlacment = ([
    [1, 11], 
    [1, 11], 
    [2, 3, 4, 5, 6, 9], 
    [1, 2, 4, 5, 7, 8, 9, 11], 
    [2, 5, 9, 10],
    [1, 5, 6, 8, 10, 11], 
    [1, 2, 4, 6, 7],
    [1, 6, 9, 11],
    [2, 3, 4, 5, 7, 8, 9],
    [1, 2, 4, 7, 9, 11],
    [3, 4, 5, 6, 7, 10],
    [1, 6, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
]);

const SCENE = document.querySelector('a-scene');

window.addEventListener('DOMContentLoaded', () => {
    createWalls(); 
});

function createWalls(){
    for (let row = 0; row < wallPlacment.length; row++){
        for (let coloumn = 0; coloumn < wallPlacment[row].length; coloumn++ ){
            let rotationVal = 0;
            if ((row/2) % 1 == 0.5){
                rotationVal = 90;
            }
            
            //console.log(wallPlacment[row][coloumn])
            createWall((wallPlacment[row][coloumn] - (0.5*scale.xPlac)), (row  - (0.25*scale.xPlac)), rotationVal)
            //console.log(row)
           // console.log(wallPlacment[row]);
        }
    }
    //createWall(wallCords, 0); 
}

    
function createWall(xCord, zCord, rotationVal){
    //console.log("runnin createWall");
    const WALL = document.createElement('a-gltf-model');
    if (rotationVal == 0){
        WALL.setAttribute('position', `${xCord*scale.xPlac} 100 ${zCord*scale.xPlac*0.5}`);
    } else {
        WALL.setAttribute('position', `${(xCord-0.5)*scale.xPlac} 100 ${zCord*scale.xPlac*0.5}`);
    }
    WALL.setAttribute('src','#wall1');
    WALL.setAttribute('scale', `${scale.xMult} ${scale.yMult} ${scale.zMult}`);
    WALL.setAttribute('rotation', `0 ${rotationVal}  0`);
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