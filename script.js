import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/*Canvas*/
const canvas = document.querySelector('canvas.webgl');

/*Scene*/
const scene = new THREE.Scene();

/*Camera*/
const sizes = {width: window.innerWidth, height: window.innerHeight};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/*Renderer*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*Resize Listener*/
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

/*Objects*/
const grid = new THREE.GridHelper(100, 100);
scene.add(grid);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/*Animation*/
const tick = function() {
    renderer.render(scene, camera);
    controls.update();
    window.requestAnimationFrame(tick);
};
tick();

/*GUI*/
const gui = new dat.GUI();
gui.add(mesh.position, 'x').min(- 3).max(3).step(0.01).name('x:');
gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('y:');
gui.add(mesh.position, 'z').min(- 3).max(3).step(0.01).name('z:');
gui.add(mesh.rotation, 'x').min(- 3).max(3).step(0.01).name('rotation x:');
gui.add(mesh.rotation, 'y').min(- 3).max(3).step(0.01).name('rotation y:');
gui.add(mesh.rotation, 'z').min(- 3).max(3).step(0.01).name('rotation z:');
gui.add(mesh.scale, 'x').min(0).max(5).step(0.01).name('scale x:');
gui.add(mesh.scale, 'y').min(0).max(5).step(0.01).name('scale y:');
gui.add(mesh.scale, 'z').min(0).max(5).step(0.01).name('scale z:');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
const parameters = { color: 0xff0000 };
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})