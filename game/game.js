
let wallCords = 6

let scale = {
  xMult: 1, 
  yMult: 0.9090900177208052, 
  zMult: 0.9999998437456502,
  xPlac: 12,
  yPlac: 2}

let globalShift = {
    x: 60,
    z: 65,
    y: 0
}
  
  const wallPlacment = ([
     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
     [0, 1, 1, 1, 1, 1, 0, 0, 1, 1], 
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1], 
     [0, 1, 0, 0, 1, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1], 
     [1, 1, 0, 1, 0, 1, 1, 0, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], 
     [0, 1, 1, 1, 1, 0, 1, 1, 1, 0], 
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1], 
     [0, 0, 1, 1, 1, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1], 
     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
]);

const FrogPlacment = ([
     [1,1,0], 
     [1,4,0], 
     [2.5,9,0], 
     [4,3,0],
     [4.5,2.5,180],
     [4.5,6,0],

]);

const SCENE = document.querySelector('a-scene');
const BOX = document.querySelector('#detectionBox');

window.addEventListener('DOMContentLoaded', () => {
    createWalls(); 
    createPillers(); 
    createFrogs(); 
});

function createWalls(){
    for (let row = 0; row < wallPlacment.length; row++){
        for (let coloumn = 0; coloumn < wallPlacment[row].length; coloumn++ ){
            let rotationVal = 0;
            if ((row/2) % 1 == 0.5){
                rotationVal = 90;
            } 
            if (wallPlacment[row][coloumn] == 1){
                createWall((coloumn), (row), rotationVal)
            }
        }
    }
}
function createWall(xCord, zCord, rotationVal){
    const WALL = document.createElement('a-gltf-model');
    if (rotationVal == 0){
        WALL.setAttribute('position', `${xCord*scale.xPlac-globalShift.x} ${globalShift.y} ${zCord*scale.xPlac*0.5-globalShift.z}`);
    } else {
        WALL.setAttribute('position', `${(xCord-0.5)*scale.xPlac-globalShift.x} ${globalShift.y} ${zCord*scale.xPlac*0.5-globalShift.z}`);
    }
    WALL.setAttribute('src','#wall1');
    WALL.setAttribute('scale', `${scale.xMult} ${scale.yMult} ${scale.zMult}`);
    WALL.setAttribute('rotation', `0 ${rotationVal}  0`);
    SCENE.appendChild(WALL);
}

function createPillers(){
    for (let row = 0; row < (wallPlacment.length + 1)/2; row++){
        console.log("Max Row :  " + (wallPlacment.length + 1)/2)
        for (let coloumn = 0; coloumn < wallPlacment[0].length + 1; coloumn++ ){
            createPiller(coloumn, row);
        }
    }
}
function createPiller(xCord, zCord){
    const PILLER = document.createElement('a-gltf-model');
    PILLER.setAttribute('position', `${(xCord - 0.5)*scale.xPlac-globalShift.x} ${globalShift.y} ${zCord*scale.xPlac-globalShift.z}`);
    PILLER.setAttribute('src','#piller');
    PILLER.setAttribute('scale', `${scale.xMult} ${scale.yMult} ${scale.zMult}`);
    SCENE.appendChild(PILLER);
}

function createFrogs(){
    for (let i = 0; i <FrogPlacment.length; i++){
        createFrog(FrogPlacment[i][1], FrogPlacment[i][0], FrogPlacment[i][2]-180)
    }
}
function createFrog(xCord, zCord, rotationVal){
    const FROG = document.createElement('a-gltf-model');
    FROG.setAttribute('position', `${(xCord - 0.5)*scale.xPlac-globalShift.x} ${0} ${zCord*scale.xPlac-globalShift.z}`);
    FROG.setAttribute('src','#frog');
    FROG.setAttribute('rotation', `0 ${rotationVal}  0`);
    FROG.setAttribute('scale','1 1 1');
    SCENE.appendChild(FROG);
}

if (BOX.x == null){
    console.log("aaa")
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