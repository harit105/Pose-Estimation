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

const texture = new THREE.VideoTexture(video);

// geometry
const geometry = new THREE.PlaneGeometry( 2, 2 / aspectRatio );
// material 
const material = new THREE.MeshBasicMaterial( {color: 0xffffff,map:texture,side: THREE.DoubleSide} );

// Plane mesh
const plane = new THREE.Mesh( geometry, material );

// Adding to the scene

scene.add( plane );


const vertices = [];

for ( let i = 0; i < 10000; i ++ ) {

	const x = THREE.MathUtils.randFloatSpread( 2000 );
	const y = THREE.MathUtils.randFloatSpread( 2000 );
	const z = THREE.MathUtils.randFloatSpread( 2000 );

	vertices.push( x, y, z );

}

const geometry1 = new THREE.BufferGeometry();
geometry1.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material1 = new THREE.PointsMaterial( { color: 0x888888} );

const points = new THREE.Points( geometry1, material1 );

scene.add( points );





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







// let rotationOn;
// let showDots;
// let showSkeletons;
// let showTrajectory;
// let pointCloudVisible;
// let blackAndWhite;
// let pointCloud;
// let particlePositions;
// let linesMesh;  // lines between keypoints
// let linesLinks; // lines between keypoints frame
// let time = 0;  // Use for corresponding frame in shader
// //let blackAndWhite = true;
// let showTrajectory = false;
// let rotationOn = true;



// const effectController = {  
//     rotationOn: true,
//     showDots: true,
//     showSkeletons: true,
//     showTrajectory: true,
//     BlackAndWhite: true
// };
//Debug
// const gui = new dat.GUI()
// gui.add(plane.position, 'y').min(- 3).max(3).step(0.01).name('elevation')
// gui.add(effectController,"showDots").onChange( function (value){
//     pointcloud.visible = value;
// });
// gui.add( effectController, "showSkeletons" ).onChange( function ( value ) {

//     linesMesh.visible = value;

// } );

// gui.add( effectController, "showTrajectory" ).onChange( function ( value ) {

//     linesLinks.visible = value;

// } );

// gui.add( effectController, "BlackAndWhite" ).onChange( function ( value ) {

//     blackAndWhite = value;
//     pointCloud.material.uniforms.bw.value = blackAndWhite;
//     linesMesh.material.uniforms.bw.value  = blackAndWhite;

// } );

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

 

