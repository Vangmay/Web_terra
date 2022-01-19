
const hero = document.querySelector('.heroo');
//Threee          
//Important stuff
const Width = hero.clientWidth
const Height=  hero.clientHeight
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(40,Width/Height,1,5000);
camera.rotation.y = 45/180 * Math.PI;
camera.position.x = 1221;
camera.position.y = 389;
camera.position.z = 1221;

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( Width,Height );
hero.appendChild( renderer.domElement );
//Important stuff

//Lighting
const hlight = new THREE.AmbientLight(0xFFFFFF,0.1);
hlight.position.set(2,2,4);
// scene.add(hlight)


var light = new THREE.PointLight(0xffffff, 0.2,1000);
light.position.set(414,121,88.54)
scene.add( light );

var light2 = new THREE.PointLight(0x52f9c4, 2.8,1000);
light2.position.set(414,772,576.7)
scene.add( light2 );


//Lighting

window.addEventListener( 'resize', onWindowResize );


let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

document.addEventListener('mousemove', onMouseMove)

const clock = new THREE.Clock()

let loader = new THREE.GLTFLoader();
loader.load('./Earth.gltf',function(gltf){
    earth = gltf.scene.children[0]
    scene.scale.set(1.2,1.2,1.2)
    scene.add(earth)
    animate();
})

function animate() {
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()
    
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
    
    earth.rotation.y = 0.5 * elapsedTime
    earth.rotation.y += 1.6 * (targetX - earth.rotation.y)
    earth.rotation.x += 1.6 * (targetY - earth.rotation.x)
    earth.rotation.z += 1.6 * (targetY - earth.rotation.x)
    
}


function onWindowResize() {
    let Width = hero.clientWidth
    let Height = hero.clientHeight
    camera.aspect = Width/ Height;
    
    camera.updateProjectionMatrix();
    renderer.setSize( Width,Height );
    
}
//Threee