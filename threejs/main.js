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

// Bodies' radius
const EARTH_RADIUS = 2.8;
const MERCURY_RADIUS = 0.38 * EARTH_RADIUS;
const VENUS_RADIUS = 0.95 * EARTH_RADIUS;
const MARS_RADIUS = 0.53 * EARTH_RADIUS;
const JUPITER_RADIUS = 11.26 * EARTH_RADIUS;
const SATURN_RADIUS = 9.45 * EARTH_RADIUS;
const URANUS_RADIUS = 4 * EARTH_RADIUS;
const NEPTUNE_RADIUS = 3.89 * EARTH_RADIUS;
const MOON_RADIUS = 0.27 * EARTH_RADIUS;
const SUN_RADIUS = 109.58 * EARTH_RADIUS * 0.1;  // o Sol é grande demais para ser representado com o tamanho proporcional

// Bodies's distance from Sun
const EARTH_DISTANCE = 100;
const MERCURY_DISTANCE = 0.38 * EARTH_DISTANCE;
const VENUS_DISTANCE = 0.72 * EARTH_DISTANCE;
const MARS_DISTANCE = 1.52 * EARTH_DISTANCE;
const JUPITER_DISTANCE = 5.19 * EARTH_DISTANCE;
const SATURN_DISTANCE = 9.55 * EARTH_DISTANCE;
const URANUS_DISTANCE = 19.18 * EARTH_DISTANCE;
const NEPTUNE_DISTANCE = 30.07 * EARTH_DISTANCE;

// Moon's distance from Earth
const MOON_DISTANCE = EARTH_RADIUS * 1.5;

// Angle increments per frame representing planets' rotations
const EARTH_DAY = 0.02;
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

function init() {

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight); 

    // Setting up camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 7000 );
    camera.position.z = 3;
    camera.position.y = 200;
    camera.lookAt( 0, 0, -4);
    
    // Setting up scene
    scene = new THREE.Scene();

    var skyGeo = new THREE.SphereGeometry(5000, 50, 50);
    var loader  = new THREE.TextureLoader(),
        texture = loader.load( "texture/starmap.jpg" );
    var material = new THREE.MeshBasicMaterial({ 
        map: texture,
    });
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    scene.add(sky);

    // Sun (Sphere + Light)
    sun = createSphere(SUN_RADIUS, 20, 'texture/sun.jpg');
    // sun.position.z = -3;
    sun.position = SUN_CENTER;
    sunlight = new THREE.PointLight( 0xffffffff, 1.5, 7000, 2);
    sun.add(sunlight);
    scene.add(sun);

    /* Complete: add 
    other planets */
    // Mercury
    mercury = createSphere(MERCURY_RADIUS, 20, 'texture/mercury.jpg', 'Phong');
    mercury.position.z = -MERCURY_DISTANCE;
    sun.add(mercury);

    // Venus
    venus = createSphere(VENUS_RADIUS, 20, 'texture/venus_atmosphere.jpg', 'Phong');
    venus.position.z = -VENUS_DISTANCE;
    sun.add(venus);

    // Earth
    earth = createSphere(EARTH_RADIUS, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = -EARTH_DISTANCE;
    sun.add(earth);

    // Moon
    moon = createSphere(MOON_RADIUS, 20, 'texture/moon.jpg', 'Phong');
    // moon.position.z = -2;
    moon.position.z = -MOON_DISTANCE;
    earth.add(moon);

    // Mars
    mars = createSphere(MARS_RADIUS, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = -MARS_DISTANCE;
    sun.add(mars);

    // Jupiter
    jupiter = createSphere(JUPITER_RADIUS, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = -JUPITER_DISTANCE;
    sun.add(jupiter);

    // Saturn
    saturn = createSphere(SATURN_RADIUS, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = -SATURN_DISTANCE;
    sun.add(saturn);

    // Saturn Ring
    saturn_ring = createRing(SATURN_RADIUS * 1.1, SATURN_RADIUS * 1.3, 30, 'texture/saturn_ring_alpha.png');
    saturn_ring.rotation.x = 80;
    saturn.add(saturn_ring);

    // Uranus
    uranus = createSphere(URANUS_RADIUS, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = -URANUS_DISTANCE;
    sun.add(uranus);

    // Neptune
    neptune = createSphere(NEPTUNE_RADIUS, 20, 'texture/neptune.jpg', 'Phong');
    neptune.position.z = -NEPTUNE_DISTANCE;
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

    axisY = new THREE.Vector3(0, 1, 0);
    origin = new THREE.Vector3();

    // Rotations
    mercury.rotateOnAxis(axisY, MERCURY_DAY);
    venus.rotateOnAxis(axisY, -VENUS_DAY);  // sentido horario
    earth.rotateOnAxis(axisY, EARTH_DAY);
    mars.rotateOnAxis(axisY, MARS_DAY);
    jupiter.rotateOnAxis(axisY, JUPITER_DAY);
    saturn.rotateOnAxis(axisY, SATURN_DAY);
    uranus.rotateOnAxis(axisY, -URANUS_DAY);  // sentido horario
    neptune.rotateOnAxis(axisY, NEPTUNE_DAY);
    moon.rotateOnAxis(axisY, MOON_ROTATION - EARTH_DAY);  // anulamos a rotacao da Terra

    // Revolutions
    mercury.rotateAroundPoint(origin, MERCURY_YEAR, axisY, false);
    venus.rotateAroundPoint(origin, VENUS_YEAR, axisY, false);
    earth.rotateAroundPoint(origin, EARTH_YEAR, axisY, false);
    mars.rotateAroundPoint(origin, MARS_YEAR, axisY, false);
    jupiter.rotateAroundPoint(origin, JUPITER_YEAR, axisY, true);
    saturn.rotateAroundPoint(origin, SATURN_YEAR, axisY, false);
    uranus.rotateAroundPoint(origin, URANUS_YEAR, axisY, false);
    neptune.rotateAroundPoint(origin, NEPTUNE_YEAR, axisY, false);
    moon.rotateAroundPoint(earth.position, MOON_REVOLUTION, axisY, true);

}

init();
animate();


