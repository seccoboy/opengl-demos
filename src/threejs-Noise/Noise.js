
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(90, 800/600, 0.1, 1000); // Could use window.innerWidth/window.innerHeight
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls( camera, renderer.domElement ); // control de camera

scene.background = new THREE.Color('gray'); // set the background as gray
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.BasicShadowMap;

camera.position.z = -1; // set the camera position
camera.position.y = 0;  // a bit far from the center

// light1 = new THREE.PointLight(0xffffff, 1, 20);
// light1.position.set(-2,2,0);
// light1.castShadow = true;
// light1.shadow.camera.near = 0.1; // Will not light anything closer than 0.1 units 
// light1.shadow.camera.far = 10; // or further than 25 units
// scene.add(light1);

//
var points = [];
let grid_size = 4;
let pixels = 56;
var widht = 800; 
let pix_size =  widht / pixels;
let y = 0;
let x = 0;
//

var setup = function(){
    renderer.setSize(window.innerWidth, window.innerHeight); // Could use (1280, 720)
    draw();
}

var draw = function(){
    perlin.seed();
    var material = new THREE.LineBasicMaterial( { color: 0xFFaa33 } );
    for(y; y < grid_size; y+=grid_size / pixels){
        x=0;
        for(x; x< grid_size; x+=grid_size / pixels){
            let z = parseInt(perlin.get(x,y)*360);
            console.log(x, y, z)           
            points.push( new THREE.Vector3( (x,y,z)));
            var geometry = new THREE.BufferGeometry().setFromPoints( points );

            var line = new THREE.Line( geometry, material );
            scene.add( line );
        }
    } 
 
}


var animate = function() {
    requestAnimationFrame(animate); // needed to work

    controls.update(); // needed to move the camera
    setup();

    renderer.render(scene, camera); // needed to work
};
animate();
// function onKeyDown(event) {
//     var keyCode = event.which;

// };
// document.addEventListener("keydown", onKeyDown, false);