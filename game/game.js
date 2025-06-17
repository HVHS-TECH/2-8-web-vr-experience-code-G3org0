
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
const FROGCOUNTER = document.querySelector('#frogCounter');
const TIMER = document.querySelector('#timer');
var frogs;
var gamePlaying = true;
var timer = 0
var frogCounter = 0

window.addEventListener('DOMContentLoaded', () => {
    //createWalls(); 
    //createPillers(); 
    createFrogs(); 
    
    setupListeners();
    FROGCOUNTER.setAttribute('value', "");
    psedoDraw();
});

function psedoDraw() {
    setTimeout(() => {
        if (gamePlaying){
            timer++
            TIMER.setAttribute('value', "");
            psedoDraw();
        } 
    }, 1000);
}

function setupListeners() {
    frogs = SCENE.querySelectorAll('.clickable'); // update after frogs are created
    frogs.forEach(frog => {
        frog.addEventListener('click', FrogClicked, {
            passive: true,
            once: true,
        });
    });
}

function FrogClicked(evt) {
    var frog = evt.target
    frogCounter ++;
    FROGCOUNTER.setAttribute('value', "");
    if (frogCounter == FrogPlacment.length){
            gamePlaying = false
            gameOverUi(timer);
        }
    frog.setAttribute('animation', {
        property: 'scale',
        to: '1, 0, 1',
        dur: 300,
        easing: 'easeInOutQuad',
    });
    setTimeout(() => {
        console.log("clicked ")
        SCENE.removeChild(frog);
        frog.destroy()
    }, 350);
}

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
    const FROG = document.createElement('a-entity');
    FROG.setAttribute('gltf-model', '#frog');
    FROG.setAttribute('position', `${(xCord - 0.5)*scale.xPlac-globalShift.x} ${0} ${zCord*scale.xPlac-globalShift.z}`);
    FROG.setAttribute('rotation', `0 ${rotationVal}  0`);
    FROG.setAttribute('scale','1 1 1');
    FROG.setAttribute('class', 'clickable')
    SCENE.appendChild(FROG);
}

function gameOverUi(timer){
    const GOTEXT = document.querySelector('#gameOverText');
    const FTTEXT = document.querySelector('#finalTimeText');
    TIMER.setAttribute('opacity', '0')
    FROGCOUNTER.setAttribute('opacity', '0')
    GOTEXT.setAttribute('opacity', '1')
    FTTEXT.setAttribute('opacity', '1')
    FTTEXT.setAttribute('value', "")
    console.log("damn")
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