import { KeyDisplay } from './utils';
import { CharacterControls } from './characterControls';
import * as THREE from 'three'
import { CameraHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';

initMechContract();

let prefix = '/cb-banner-generator/src/';
// let prefix = './';

let globalOffsetZ = 1.5;
let scale = 5;
// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

// instantiate a loader
const svgLoader = new SVGLoader();
const gltfLoader = new GLTFLoader();
const vrmLoader = new GLTFLoader();
vrmLoader.register((parser: GLTFParser) => {
    return new VRMLoaderPlugin(parser);
});

// CAMERA
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
/**
     * Creates a new {@link OrthographicCamera}.
     * @remarks Together these define the camera's {@link https://en.wikipedia.org/wiki/Viewing_frustum | viewing frustum}.
     * @param left Camera frustum left plane. Default `-1`.
     * @param right Camera frustum right plane. Default `1`.
     * @param top Camera frustum top plane. Default `1`.
     * @param bottom Camera frustum bottom plane. Default `-1`.
     * @param near Camera frustum near plane. Default `0.1`.
     * @param far Camera frustum far plane. Default `2000`.
     */

let bg_width = 768/5;
let bg_height = 256/5;
const camera = new THREE.OrthographicCamera(-bg_width/2, bg_width/2, bg_height/2, -bg_height/2, 0.1, 256);
// camera.position.y = 0;
// camera.position.z = 0;
// camera.position.x = 0;
// camera.up.set(0, 1, 0)
// camera.lookAt(new THREE.Vector3(0,1,0));
// camera.rotation.x = Math.PI/2;
camera.rotation.set(0, -Math.PI / 2, 0)

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(1536, 512);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true

// CONTROLS
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true
// orbitControls.minDistance = 0.5
// orbitControls.maxDistance = 5
// orbitControls.enablePan = true
// orbitControls.maxPolarAngle = Math.PI
// orbitControls.update();

// // camera.position.set( 0, 0, 0 );
// // camera.rotation.set(0, -Math.PI / 2, 0)
// camera.lookAt(new THREE.Vector3(0,1,0));
// orbitControls.update();

// LIGHTS
light()

// FLOOR
// generateFloor()

let lp = '1';
let cbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let mechIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
let hasLp: any = getLP();
let hasCbs: any = getCBs();
let hasMechs: any = getMechs();
let faction: any = getFaction();

if(hasLp){
    lp = hasLp;
}
if(hasCbs){
    cbs = hasCbs;
}
if(hasMechs){
    mechIds = hasMechs;
}

loadLostParadigm(parseInt(lp));

cbs.forEach((cb: string, index: number)=>{
    loadBroker(parseInt(cb), index*15);
})

cbs.forEach((cb: string, index: number)=>{
    loadPixelBroker(parseInt(cb), index*15);
})

if(faction){
    loadFaction(faction);
}

// loadSVG('https://ipfs.io/ipfs/QmcsrQJMKA9qC9GcEMgdjb9LPN99iDNAg8aQQJLJGpkHxk/1.svg');

// loadSVG('./textures/cyberbrokers/0.svg');


var characterControls: CharacterControls



// let mechs = [709, 16, 23, 47, 61, 66, 106, 140, 150, 155, 158, 161, 163, 172, 182, 224, 314, 326, 328, 338, 341, 348, 349, 389, 424, 428, 430, 443, 448, 452, 456, 458, 472, 478, 487, 492, 522, 525, 531, 532, 539, 540, 549, 553, 555, 629, 636, 640, 660, 682];

// let wallet: any = '0x95D2Ef8a0e56097f765478911b60D608C445CD47';
let wallet: any = '0xd4BAa5B1cfd74512a4243B09b544E6fb19832389';
let hasWallet: any = getWallet();

if(hasWallet){
    wallet = hasWallet;
}

if(true){
        // let globalOffsetX = (mechIds.length/2)-1 * scale * 10.4;


        if(mechIds.length > 9){
            mechIds = mechIds.slice(0, 9);
        }
        
        mechIds.forEach((mechId: any, index: number)=>{

            if(index % 16 == 0){
                const light = new THREE.DirectionalLight('white', 0.5);

                light.position.set(0, 50, (index/16)*scale*20.5 - 100);
                scene.add(light);
            }
            
            vrmLoader.load(
                // URL of the VRM you want to load
                'https://m.cyberbrokers.com/eth/mech/'+mechId+'/files/mech_1k.vrm',
              
                // called when the resource is loaded
                (gltf) => {
                    // retrieve a VRM instance from gltf
                    const vrm = gltf.userData.vrm;

                    const model = vrm.scene;

                    let rightShoulderKey = 'R_shoulder_001_SCJNT_000';
                    let leftShoulderKey = 'L_shoulder_001_SCJNT_000';

                    let rightShoulder = gltf.scene.getObjectByName(rightShoulderKey);
                    rightShoulder.rotation.y = rightShoulder.rotation.y + -Math.PI/3;

                    let leftShoulder = gltf.scene.getObjectByName(leftShoulderKey);
                    leftShoulder.rotation.y = leftShoulder.rotation.y + Math.PI/3;


                    
                    // let leftSide = index%2 == 0;
                    let leftSide = false;
                    let spacing = scale*6;
                    let offsetX = scale*3;
                    let offsetY = -256/10;
                    let scaled = 2;
                    let scaledAmt = 0.1;
                    let dist = 1.25;
                    let backDist = 0;
                    let backDistAmt = 7;
                    if(index == 0 || index == 8){
                        offsetY+= dist;
                    } else if(index == 1 || index == 7){
                        offsetY+=dist*2;
                        scaled = scaled - scaledAmt*1;
                        backDist = backDistAmt;
                    } else if(index == 2 || index == 6){
                        offsetY+=dist*3;
                        scaled = scaled - scaledAmt*2;
                        backDist = backDistAmt*2;
                    } else if(index == 3 || index == 5){
                        offsetY+=dist*4;
                        scaled = scaled - scaledAmt*3;
                        backDist = backDistAmt*3;
                    } else if(index == 4){
                        offsetY+=dist*5;
                        scaled = scaled - scaledAmt*4;
                        backDist = backDistAmt*4;
                    }
                    model.position.set(35+backDist, offsetY, (Math.floor(index+1)*15) - (768/10)+globalOffsetZ);
                    model.rotation.set(0, leftSide ? Math.PI/2 : -Math.PI/2, 0);
                    model.scale.set(scale*1.5*scaled,scale*1.5*scaled,scale*1.5*scaled);
                    scene.add(model);
              
                    // add the loaded vrm to the scene
                    scene.add(vrm.scene);
                
                    // deal with vrm features
                    console.log(vrm);
                },
              
                // called while loading is progressing
                (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
              
                // called when loading has errors
                (error) => console.error(error),
              );
        })
}


// CONTROL KEYS
const keysPressed = {  }
const keyDisplayQueue = new KeyDisplay();
document.addEventListener('keydown', (event) => {
    keyDisplayQueue.down(event.key)
    if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle()
    } else {
        (keysPressed as any)[event.key.toLowerCase()] = true
    }
}, false);
document.addEventListener('keyup', (event) => {
    keyDisplayQueue.up(event.key);
    (keysPressed as any)[event.key.toLowerCase()] = false
}, false);

const clock = new THREE.Clock();
// ANIMATE
function animate() {
    let mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
        characterControls.update(mixerUpdateDelta, keysPressed);
    }
    // orbitControls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
let div = document.createElement('div');
div.classList.add('aspect');
div.appendChild(renderer.domElement)
document.body.appendChild(div);
animate();

// RESIZE HANDLER
function onWindowResize() {
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    keyDisplayQueue.updatePosition()
}
// window.addEventListener('resize', onWindowResize);

function generateFloor() {
    // TEXTURES
    const textureLoader = new THREE.TextureLoader();
    const placeholder = textureLoader.load(prefix+"textures/placeholder/placeholder.png");
    const sandBaseColor = textureLoader.load(prefix+"textures/sand/Sand 002_COLOR.png");
    const sandNormalMap = textureLoader.load(prefix+"textures/sand/Sand 002_NRM.jpg");
    const sandHeightMap = textureLoader.load(prefix+"textures/sand/Sand 002_DISP.jpg");
    const sandAmbientOcclusion = textureLoader.load(prefix+"textures/sand/Sand 002_OCC.jpg");

    const WIDTH = 80
    const LENGTH = 80

    const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
    
    const material = new THREE.MeshBasicMaterial({ 
        opacity: 0.0, 
        transparent: true, 
        side: THREE.DoubleSide, 
        depthWrite: false
    });

    const floor = new THREE.Mesh(geometry, material)
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI / 2
    scene.add(floor)
}

function wrapAndRepeatTexture (map: THREE.Texture) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    map.repeat.x = map.repeat.y = 10
}

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 2.0))

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(- 60, 100, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = - 50;
    dirLight.shadow.camera.left = - 50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    scene.add(dirLight);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))

    
}

function loadBroker(tokenId: number, x: number){
    var plane;

    createElementMaterialBroker(tokenId, (material: any)=>{
        plane = new THREE.Mesh(new THREE.PlaneGeometry(1320/100, 1760/100), material);
        plane.material.side = THREE.DoubleSide;
        plane.position.x = 27;
        plane.position.y = -256/10 + 1760/200;
        plane.position.z = x - (768/10) + (1320/200) + globalOffsetZ - 1;
    
        // rotation.z is rotation around the z-axis, measured in radians (rather than degrees)
        // Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
        plane.rotation.y = Math.PI / 2;
    
        scene.add(plane);
    });
}

function loadPixelBroker(tokenId: number, x: number){
    var plane;

    createElementMaterialPixelBroker(tokenId, (material: any)=>{
        plane = new THREE.Mesh(new THREE.PlaneGeometry(960/50, 960/50), material);
        plane.material.side = THREE.DoubleSide;
        plane.position.x = 27;
        plane.position.y = -256/10 + 960/200 + 1.6;
        plane.position.z = x - (768/10) + (1320/200) + 7.5 + globalOffsetZ - 1;
    
        // rotation.z is rotation around the z-axis, measured in radians (rather than degrees)
        // Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
        plane.rotation.y = Math.PI / 2;
    
        scene.add(plane);
    });
}

function loadLostParadigm(tokenId: number){
    var plane;

    createElementMaterial(tokenId, (material: any)=>{
        plane = new THREE.Mesh(new THREE.PlaneGeometry(768/5, 256/5), material);
        plane.material.side = THREE.DoubleSide;
        plane.position.x = 67;
        plane.position.y = 0;
    
        // rotation.z is rotation around the z-axis, measured in radians (rather than degrees)
        // Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
        plane.rotation.y = Math.PI / 2 * 3;
    
        scene.add(plane);
    });
}

function loadFaction(faction: number){
    var plane;

    createElementMaterialFaction(faction, (material: any)=>{
        let width = 0;
        let height  = 0;
        let x = 66;
        let y = 20;
        let z = 0;
        if(faction == 1){
            width = 200;
            height  = 250;
        } else if (faction == 2){
            width = 190;
            height  = 300;
        } else if (faction == 3){
            width = 190;
            height  = 190;
        }
        plane = new THREE.Mesh(new THREE.PlaneGeometry(width/20, height/20), material);
        plane.material.side = THREE.DoubleSide;
        plane.position.x = x;
        plane.position.y = y;
        plane.position.z = z;
    
        // rotation.z is rotation around the z-axis, measured in radians (rather than degrees)
        // Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
        plane.rotation.y = Math.PI / 2 * 3;
    
        scene.add(plane);
    });
}

function createElementMaterialBroker(tokenId: number, callback: any) {

    var material = new THREE.MeshBasicMaterial(); // create a material

    var loader = new THREE.TextureLoader().load(
        // resource URL
        "https://mechs-usdz.s3.us-west-1.amazonaws.com/png-nb/cb-"+tokenId.toString().padStart(5, '0')+".png" ,
        // Function when resource is loaded
        function ( texture ) {
            // do something with the texture
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // texture.offset.x = 90/(2*Math.PI);
                material.map = texture; // set the material's map when when the texture is loaded
                material.transparent = true;
                material.opacity = 1;
                // material.color = new THREE.Color(0,0,0);
                callback(material);
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}

function createElementMaterialPixelBroker(tokenId: number, callback: any) {

    var material = new THREE.MeshBasicMaterial(); // create a material

    var loader = new THREE.TextureLoader().load(
        // resource URL
        "https://cb-media.sfo3.cdn.digitaloceanspaces.com/pixelbrokers/current/pfp/"+tokenId+".png" ,
        // Function when resource is loaded
        function ( texture ) {
            // do something with the texture
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // texture.offset.x = 90/(2*Math.PI);
                material.map = texture; // set the material's map when when the texture is loaded
                material.transparent = true;
                material.opacity = 1;
                // material.color = new THREE.Color(0,0,0);
                callback(material);
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}

function createElementMaterial(tokenId: number, callback: any) {

    var material = new THREE.MeshBasicMaterial(); // create a material

    var loader = new THREE.TextureLoader().load(
        // resource URL
        "https://oqxg2wmrtpubbhcgjoawtmkzqwddjqnqxekoakos553zs66wg2ia.arweave.net/dC5tWZGb6BCcRkuBabFZhYY0wbC5FOAp0u93mXvWNpA/"+tokenId+".png" ,
        // Function when resource is loaded
        function ( texture ) {
            // do something with the texture
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // texture.offset.x = 90/(2*Math.PI);
                material.map = texture; // set the material's map when when the texture is loaded
                callback(material);
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}

function createElementMaterialFaction(faction: number, callback: any) {

    var material = new THREE.MeshBasicMaterial(); // create a material

    var loader = new THREE.TextureLoader().load(
        // resource URL
        "./textures/factions/"+faction+".png" ,
        // Function when resource is loaded
        function ( texture ) {
            // do something with the texture
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;

                material.transparent = true;
                material.opacity = 1;
                // texture.offset.x = 90/(2*Math.PI);
                material.map = texture; // set the material's map when when the texture is loaded
                callback(material);
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}