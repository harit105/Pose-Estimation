import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { Mesh } from 'three'

           
/**
 * Base
 */
// const parameters = {
//     color: 0xff0000,
//     spin: () =>
//     {
//         gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2 })
//     }
// }

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

const video = document.getElementById( 'videoElement' );

 let w = video.width; 
 let h = video.height; 

 let aspectRatio = w/h; 
 // This is because browser doesn't allow to play video without user interaction witht he screen 
 window.onclick = ()=> {
    if(video.paused)
     video.play();
    else
    video.pause(); 
 }

const texture = new THREE.VideoTexture( video );

// geometry
const geometry = new THREE.PlaneGeometry( 2, 2 / aspectRatio );
// material 
const material = new THREE.MeshBasicMaterial( {color: 0xffffff,map:texture,side: THREE.DoubleSide} );

// Plane mesh
const plane = new THREE.Mesh( geometry, material );
// Adding to the scene

scene.add( plane );
// /**
//  * Object
//  */
// // const geometry = new THREE.BoxGeometry(1, 1, 1)
// // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// // const mesh = new THREE.Mesh(geometry, material)
// // scene.add(mesh)



// /**
//  * Sizes
//  */
const sizes = {
     width: window.innerWidth,
     height: window.innerHeight
 }

 window.addEventListener('resize', () =>
 {
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
 const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
 camera.position.z = 3
 scene.add(camera)

 // Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

 /**
  * Renderer
  */
 const renderer = new THREE.WebGLRenderer({
     canvas: canvas
 })
 renderer.setSize(sizes.width, sizes.height)
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Debug
 */
// const gui = new dat.GUI({
//     // closed: true,
//     width: 400
// })
// // gui.hide()
// 
// gui.add(mesh, 'visible')
// gui.add(material, 'wireframe')

// gui
//     .addColor(parameters, 'color')
//     .onChange(() =>
//     {
//         material.color.set(parameters.color)
//     })

// gui.add(parameters, 'spin')
// let rotationOn;
// let showDots;
// let showSkeletons;
// let showTrajectory;
// let pointCloudVisible;

let pointCloud;
let particlePositions;
let linesMesh;  // lines between keypoints
let linesLinks; // lines between keypoints frame
let time = 0;  // Use for corresponding frame in shader
//let blackAndWhite = true;
let showTrajectory = false;
let rotationOn = true;

const effectController = {  
    rotationOn: true,
    showDots: true,
    showSkeletons: true,
    showTrajectory: true,
    //_3D_ON: _3D_ON,
  //  BlackAndWhite: blackAndWhite,
   // videoOpacity:videoOpacity,
    // depth: depth,
  //  nextVideo: function () {},
  //  playPause: function () {}
};
//Debug
const gui = new dat.GUI()
gui.add(plane.position, 'y').min(- 3).max(3).step(0.01).name('elevation')
gui.add(effectController,"showDots").onChange( function (value){
    pointcloud.visible = value;
});

// /**
//  * Animate
//  */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

 

