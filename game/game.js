
let wallCords = 6

let scale = {
  xMult: 1, 
  yMult: 0.9090900177208052, 
  zMult: 0.9999998437456502,
  xPlac: 12,
  yPlac: 2}
  
  const wallPlacment = ([
     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
     [0, 1, 1, 1, 1, 1, 0, 0, 1, 0], 
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1], 
     [0, 1, 0, 0, 1, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1], 
     [1, 1, 0, 1, 0, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], 
     [0, 1, 1, 1, 1, 0, 1, 1, 1, 0], 
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1], 
     [0, 0, 1, 1, 1, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
]);

const PillerPlacment = ([
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1], 
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1], 
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], 
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
]);

const SCENE = document.querySelector('a-scene');

window.addEventListener('DOMContentLoaded', () => {
    createWalls(); 
    createPillers(); 
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

function createPillers(){
    for (let row = 0; row < (wallPlacment.length + 1)/2; row++){
        console.log("Max Row :  " + (wallPlacment.length + 1)/2)
        for (let coloumn = 0; coloumn < wallPlacment[0].length + 1; coloumn++ ){
            //console.log("Max coloumn :  " + wallPlacment[row*2].length)

            //Smth funcky eith rows
                createPiller(coloumn, row);
                //console.log("please be ten")
                
            //console.log(wallPlacment[row][coloumn])
            //console.log(row)
           // console.log(wallPlacment[row]);
        }
    }
}

//function createPillerParameters (row, coloumn) {}

function FindOddsRev (x, y){
    if (y == true){
        return x*2
    } else {
        return 0
    }
}

function shouldReturn(x, y){
    if (y = true){
        return x
    } else {
        return 0
    }
}
    
function createWall(xCord, zCord, rotationVal){
    //console.log("runnin createWall");
    const WALL = document.createElement('a-gltf-model');
    if (rotationVal == 0){
        WALL.setAttribute('position', `${xCord*scale.xPlac} -50 ${zCord*scale.xPlac*0.5}`);
    } else {
        WALL.setAttribute('position', `${(xCord-0.5)*scale.xPlac} -50 ${zCord*scale.xPlac*0.5}`);
    }
    WALL.setAttribute('src','#wall1');
    WALL.setAttribute('scale', `${scale.xMult} ${scale.yMult} ${scale.zMult}`);
    WALL.setAttribute('rotation', `0 ${rotationVal}  0`);
    SCENE.appendChild(WALL);
}

function createPiller(xCord, zCord){
    console.log("Y 5 THO")
    //console.log(xCord, zCord);
    const PILLER = document.createElement('a-gltf-model');
    PILLER.setAttribute('position', `${(xCord - 0.5)*scale.xPlac} -50 ${zCord*scale.xPlac}`);
    PILLER.setAttribute('src','#piller');
    PILLER.setAttribute('scale', `${scale.xMult} ${scale.yMult} ${scale.zMult}`);
    SCENE.appendChild(PILLER);
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