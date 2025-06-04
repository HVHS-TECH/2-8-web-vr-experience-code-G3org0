
let wallCords = 6


const wallPlacment = ([
    [1, 2], 
    [3, 4], 
    [5, 6]
]);

console.log(wallPlacment.length)

const SCENE = document.querySelector('a-scene');

window.addEventListener('DOMContentLoaded', () => {
    createWalls(); 
});

function createWalls(){
    for (let row = 0; row < wallPlacment.length; row++){
        for (let coloumn = 0; coloumn < wallPlacment[row].length; coloumn++ ){
            createWall(coloumn, row)
            //console.log(row)
           // console.log(wallPlacment[row]);
        }
    }
    //createWall(wallCords, 0); 
}

    
function createWall(xCord, yCord){
    console.log("runnin createWall");
    const WALL = document.createElement('a-gltf-model');
    WALL.setAttribute('src','#wall1');
    WALL.setAttribute('position', `${xCord} 0 ${yCord}`);
    console.log(WALL);
    SCENE.appendChild(WALL);
}

//const model = document.querySelector('#wall1');
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
//});