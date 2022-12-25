import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import sunTexture from '../src/sun.jpg';
import mercuryTexture from '../src/mercury.jpg';
import venusTexture from '../src/venus.jpg';
import earthTexture from '../src/earth.jpg';
import marsTexture from '../src/mars.jpg';
import jupiterTexture from '../src/jowisz.jpg';
import saturnTexture from '../src/saturn.jpg';
import uranusTexture from '../src/uranus.jpg';
import neptuneTexture from '../src/neptune.jpg';
import spaceTexture from '../src/space.jpg';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

//Space
const spaceGeometry = new THREE.SphereGeometry(2400, 32, 16);
const texture = new THREE.TextureLoader().load(spaceTexture);
const spaceMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const space = new THREE.Mesh(spaceGeometry, spaceMaterial);

scene.add(space);

//Sun
const sunGeometry = new THREE.SphereGeometry(696 / 4, 64, 16);
const texture2 = new THREE.TextureLoader().load(sunTexture);
const sunMaterial = new THREE.MeshStandardMaterial({ map: texture2, roughness: 0, metalness: 0 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.castShadow = true;
sun.receiveShadow = true;
sun.receiveShadow = true;
scene.add(sun);

//Mercury
const mercuryGeometry = new THREE.SphereGeometry(48 / 2, 32, 16);
const texture3 = new THREE.TextureLoader().load(mercuryTexture);
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: texture3, roughness: 0, metalness: 0 });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.x = 400;
scene.add(mercury);

//Venus
const venusGeometry = new THREE.SphereGeometry(12 / 2, 32, 16);
const texture4 = new THREE.TextureLoader().load(venusTexture);
const venusMaterial = new THREE.MeshStandardMaterial({ map: texture4, roughness: 0, metalness: 0 });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.x = 450;
scene.add(venus);

//Earth
const earthGeometry = new THREE.SphereGeometry(12 / 2, 32, 16);
const texture5 = new THREE.TextureLoader().load(earthTexture);
const earthMaterial = new THREE.MeshStandardMaterial({ map: texture5, roughness: 0, metalness: 0 });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 500;
scene.add(earth);

//Mars
const marsGeometry = new THREE.SphereGeometry(7 / 2, 32, 16);
const texture6 = new THREE.TextureLoader().load(marsTexture);
const marsMaterial = new THREE.MeshStandardMaterial({ map: texture6, roughness: 0, metalness: 0 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = 550;
scene.add(mars);

//Jupiter
const jupiterGeometry = new THREE.SphereGeometry(143 / 2, 32, 16);
const texture7 = new THREE.TextureLoader().load(jupiterTexture);
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: texture7, roughness: 0, metalness: 0 });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.x = 600;
scene.add(jupiter);

//Saturn
const saturnGeometry = new THREE.SphereGeometry(120 / 2, 32, 16);
const texture8 = new THREE.TextureLoader().load(saturnTexture);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: texture8, roughness: 0, metalness: 0 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.x = 750;
scene.add(saturn);

//Saturn Ring
const saturnRingGeometry = new THREE.RingGeometry(100, 50, 30);
const saturnRingMaterial = new THREE.MeshBasicMaterial({ color: 0xfaeabe, side: THREE.DoubleSide });
const ring = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
ring.rotation.x = Math.PI / 2;
ring.rotate = saturn.add(ring);

//Uranus
const uranusGeometry = new THREE.SphereGeometry(57 / 2, 32, 16);
const texture9 = new THREE.TextureLoader().load(uranusTexture);
const uranusMaterial = new THREE.MeshStandardMaterial({ map: texture9, roughness: 0, metalness: 0 });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.x = 900;
scene.add(uranus);

//Neptune
const neptuneGeometry = new THREE.SphereGeometry(49 / 2, 32, 16);
const texture10 = new THREE.TextureLoader().load(neptuneTexture);
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: texture10, roughness: 0, metalness: 0 });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.x = 950;
scene.add(neptune);

const timeCirculation = {
  mercury: 0.24085,
  venus: 0.61521,
  earth: 1.00004,
  mars: 1.88089,
  jupiter: 11.8622,
  saturn: 29.4577,
  uranus: 84.0153,
  neptune: 164.788,
};

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 5000);
camera.position.z = 1100;
camera.position.y = 300;
camera.position.x = -1000;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 1500;
controls.maxPolarAngle = Math.PI / 2;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor('#000000');
// renderer.sortObjects = false;
renderer.shadowMap.enabled = true;

// Animate
const clock = new THREE.Clock();

let t = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sun.rotation.y = elapsedTime;
  mercury.position.set(Math.cos((elapsedTime * 1) / timeCirculation.mercury) * 400, 0, Math.sin((elapsedTime * 1) / timeCirculation.mercury) * 400);
  venus.position.set(Math.cos((elapsedTime * 1) / timeCirculation.venus) * 450, 0, Math.sin((elapsedTime * 1) / timeCirculation.venus) * 450);
  earth.position.set(Math.cos((elapsedTime * 1) / timeCirculation.earth) * 500, 0, Math.sin((elapsedTime * 1) / timeCirculation.earth) * 500);
  mars.position.set(Math.cos((elapsedTime * 1) / timeCirculation.mars) * 550, 0, Math.sin((elapsedTime * 1) / timeCirculation.mars) * 550);
  jupiter.position.set(Math.cos((elapsedTime * 1) / timeCirculation.jupiter) * 600, 0, Math.sin((elapsedTime * 1) / timeCirculation.jupiter) * 600);
  saturn.position.set(
    Math.cos((3 * Math.PI) / 2 + (elapsedTime * 1) / timeCirculation.saturn) * 750,
    0,
    Math.sin((3 * Math.PI) / 2 + (elapsedTime * 1) / timeCirculation.saturn) * 750
  );
  uranus.position.set(
    Math.cos(-Math.PI / 2 + (elapsedTime * 1) / timeCirculation.uranus) * 800,
    0,
    Math.sin(-Math.PI / 2 + (elapsedTime * 1) / timeCirculation.uranus) * 900
  );
  neptune.position.set(
    Math.cos(Math.PI / 2 + (elapsedTime * 1) / timeCirculation.neptune) * 900,
    0,
    Math.sin(Math.PI / 2 + (elapsedTime * 1) / timeCirculation.neptune) * 950
  );

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
