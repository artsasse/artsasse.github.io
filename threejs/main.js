// ThreeJS variables
var camera, scene, renderer;

// OrbitControls (camera)
var controls;

// Optional (showFps)
var stats;

// Objects in Scene
var sun, earth;
// To be added 
// var moon; ...  

// Light in the scene 
var sunlight;

// Angle increments per frame representing planets' rotations
const EARTH_DAY = 1.2;
const MERCURY_DAY = EARTH_DAY / 58.6;
const VENUS_DAY = EARTH_DAY / 243;
const MARS_DAY = EARTH_DAY / 1.03;
const JUPITER_DAY = EARTH_DAY / 0.41;
const SATURN_DAY = EARTH_DAY / 0.45;
const URANUS_DAY = EARTH_DAY / 0.72;
const NEPTUNE_DAY = EARTH_DAY / 0.67;


// Angle increments per frame representing planets' revolutions
const EARTH_YEAR = EARTH_DAY / 365;
const MERCURY_YEAR = EARTH_DAY / 87.97;
const VENUS_YEAR = EARTH_DAY / 224.7;
const MARS_YEAR = EARTH_YEAR / 1.88;
const JUPITER_YEAR = EARTH_YEAR / 11.86;
const SATURN_YEAR = EARTH_DAY / 29.46;
const URANUS_YEAR = EARTH_DAY / 84;
const NEPTUNE_YEAR = EARTH_DAY / 164.79;


// Angle increments per frame for Moon
const MOON_ROTATION = EARTH_DAY / 30;
const MOON_REVOLUTION = EARTH_DAY / 30;

// Solar System Center
const SUN_CENTER = new THREE.Vector3(0, 0, -3);

// Earth Center
const EARTH_CENTER = new THREE.Vector3(0, 0, -12);

function init() {

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight); 

    // Setting up camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 1000 );
    camera.position.z = 3;
    camera.position.y = 20;
    camera.lookAt( 0, 0, -4);
    
    // Setting up scene
    scene = new THREE.Scene();

    // Sun (Sphere + Light)
    sun = createSphere(1.25, 20, 'texture/sun.jpg');
    // sun.position.z = -3;
    sun.position = SUN_CENTER;
    sunlight = new THREE.PointLight( 0xffffffff, 1.5, 0, 2);
    sun.add(sunlight);
    scene.add(sun);

    /* Complete: add 
    other planets */
    // Mercury
    mercury = createSphere(1, 20, 'texture/mercury.jpg', 'Phong');
    mercury.position.z = -6;
    sun.add(mercury);

    // Venus
    venus = createSphere(1, 20, 'texture/venus_atmosphere.jpg', 'Phong');
    venus.position.z = -9;
    sun.add(venus);

    // Earth
    earth = createSphere(1, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = -12;
    sun.add(earth);

    // Moon
    moon = createSphere(0.2, 20, 'texture/moon.jpg', 'Phong');
    moon.position.z = -2;
    earth.add(moon);

    // Mars
    mars = createSphere(1, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = -15;
    sun.add(mars);

    // Jupiter
    jupiter = createSphere(1, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = -18;
    sun.add(jupiter);

    // Saturn
    saturn = createSphere(1, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = -21;
    sun.add(saturn);

    // Saturn Ring
    saturn_ring = createRing(1.2, 1.6, 30, 'texture/saturn_ring_alpha.png', 'Phong');
    // saturn_ring.rotation.x = 10;
    saturn.add(saturn_ring);

    // Uranus
    uranus = createSphere(1, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = -24;
    sun.add(uranus);

    // Neptune
    neptune = createSphere(1, 20, 'texture/neptune.jpg', 'Phong');
    neptune.position.z = -27;
    sun.add(neptune);
    
    // Adding both renderer and stats to the Web page, also adjusting OrbitControls
    stats = new Stats();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.zoomSpeed = 2;

    // Adding listener for keydown 
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Saving initial position 
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.savePosition();
        }
    
    } ); 
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

function onDocumentKeyDown(event) {
    console.log(event.which);
}

function animate() {
    
    requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    stats.update();
    renderer.render( scene, camera );

    // Rotations
    mercury.rotation.y+=MERCURY_DAY;
    venus.rotation.y+=VENUS_DAY;
    earth.rotation.y+=EARTH_DAY;
    mars.rotation.y+=MARS_DAY;
    jupiter.rotation.y+=JUPITER_DAY;
    saturn.rotation.y+=SATURN_DAY;
    uranus.rotation.y+=URANUS_DAY;
    neptune.rotation.y+=NEPTUNE_DAY;
    moon.rotation.y+=MOON_ROTATION;

    // Revolutions
    axisY = new THREE.Vector3(0, 1, 0);
    mercury.rotateAroundPoint(SUN_CENTER, MERCURY_YEAR, axisY, true);
    venus.rotateAroundPoint(SUN_CENTER, VENUS_YEAR, axisY, true);
    earth.rotateAroundPoint(SUN_CENTER, EARTH_YEAR, axisY, true);
    mars.rotateAroundPoint(SUN_CENTER, MARS_YEAR, axisY, true);
    jupiter.rotateAroundPoint(SUN_CENTER, JUPITER_YEAR, axisY, true);
    saturn.rotateAroundPoint(SUN_CENTER, SATURN_YEAR, axisY, true);
    uranus.rotateAroundPoint(SUN_CENTER, URANUS_YEAR, axisY, true);
    neptune.rotateAroundPoint(SUN_CENTER, NEPTUNE_YEAR, axisY, true);
    moon.rotateAroundPoint(EARTH_CENTER, MOON_REVOLUTION, axisY, true);

}

init();
animate();


