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
    sun.position.z = -3;
    /* Complete: add light
    sunlight...;
    sun...
    */
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
    moon = createSphere(0.5, 20, 'texture/moon.jpg', 'Phong');
    moon.position.z = -13;
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
    saturn_ring = createRing(1.2, 1.6, 8, 'texture/saturn_ring_alpha.png', 'Phong');
    saturn_ring.position.z = -21;
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
    earth.rotation.y+=0.02
    

}

init();
animate();


