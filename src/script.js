import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as dat from 'dat.gui'

// Loader
const textureLoader = new THREE.TextureLoader();
const myTexture = textureLoader.load('/textures/texture1.jpeg')
myTexture.wrapS = THREE.RepeatWrapping;
myTexture.wrapT = THREE.RepeatWrapping;
myTexture.repeat.set(10, 10);

console.log(myTexture);
const bodyMaterial = new THREE.MeshStandardMaterial({ map: myTexture });
// const bodyMaterial = new THREE.MeshPhysicalMaterial({
//     color: 0xff0000, metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
// });

const loader = new GLTFLoader().setPath('/models/');;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/gltf/');
loader.setDRACOLoader(dracoLoader);

let obj;
loader.load('moi_mem2.glb', function (gltf) {
    obj = gltf;
    console.log(obj);
    const myModel = gltf.scene.children[0];

    // gltf.scene.children[0].children[0].material = bodyMaterial
    myModel.getObjectByName('Cube004').material = bodyMaterial
    // myModel.getObjectByName('Cube004_1').material = bodyMaterial
    // myModel.getObjectByName('shoe_2').material = bodyMaterial
    // myModel.getObjectByName('shoe_3').material = bodyMaterial
    // myModel.getObjectByName('shoe_4').material = bodyMaterial


    // const textureLoader = new THREE.TextureLoader();
    // const myTexture = textureLoader.load('textures/texture1.jpeg')


    scene.add(obj.scene);

    render();
}, undefined, function (error) {

    console.error(error);

});

// console.log(obj);

function MaterialMap(mat) {
    mat = new THREE.MeshStandardMaterial();
    mat.map = myTexture;
    mat.map.repeat.x = 0.0002;
    mat.map.repeat.y = 0.0002;
    mat.color.setHex(0x29540a);
}

// let meshes = obj.children;
// let modelParts = map(meshes, (el, ii) => {
//     if (meshes[ii] instanceof THREE.Group) {
//         meshes[ii].children.forEach(function (m) {
//             m.material = MaterialMap(m.material);
//             m.receiveShadow = true;
//         })
//         el.receiveShadow = true;
//     } else {
//         if (meshes[ii].material) {
//             meshes[ii].material = MaterialMap(meshes[ii].material);
//         }
//     }
// })

// function onProgress(xhr) {

//     if (xhr.lengthComputable) {

//         const percentComplete = xhr.loaded / xhr.total * 100;
//         console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

//     }

// }

// function onError() { }

// const loader = new OBJLoader(manager);
// loader.load('models/obj/male02/male02.obj', function (obj) {

//     object = obj;

// }, onProgress, onError);


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

// Materials

// const material = new THREE.MeshStandardMaterial()
// material.color = new THREE.Color(0xff0000)
// material.normalMap = myTexture
// obj.material.map = material

// const material = obj.scene.material

// Mesh
// const sphere = new THREE.Mesh(obj, material)
// scene.add(obj)

// Lights

const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
scene.add(ambientLight);



// scene.add(new THREE.AmbientLight(0x666666));

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
// camera.position.x = 0
// camera.position.y = 0
// camera.position.z = 5
// scene.add(camera)
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set(- 1.8, 0.6, 2.7);

// soi den dau thi sang den do
const pointLight = new THREE.PointLight(0xffffff, 1);
camera.add(pointLight);
scene.add(camera);
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xe0d2cf, 1);




// xoay 360
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, - 0.2);
controls.update();

function render() {

    renderer.render(scene, camera);

}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()