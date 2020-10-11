
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000); // Could use 1280/1024... OR... window.innerWidth/window.innerHeight
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls( camera, renderer.domElement ); // control de camera

scene.background = new THREE.Color('gray'); // set the background as gray
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.BasicShadowMap;

camera.position.z = 5; // set the camera position
camera.rotation.z = 180; // set the camera position
// camera.position.x = -2
// camera.position.y = 2

// light1 = new THREE.PointLight(0xffffff, 1, 20);
// light1.position.set(-2,2,0);
// light1.castShadow = true;
// light1.shadow.camera.near = 0.1; // Will not light anything closer than 0.1 units 
// light1.shadow.camera.far = 10; // or further than 25 units
// scene.add(light1);

//
let grid_size = 4; //Scale the Canvas 
let pixels = 32;  //Quantity of pixels, more detail, level of detail
let y = 0;
let x = 0;
stride = grid_size / pixels;
//

var setup = function(){
    renderer.setSize(window.innerWidth, window.innerHeight); // Could use (1280, 720)
    draw();
}

var draw = function(){
    perlin.seed();
    for(y; y < grid_size; y+=stride){
        x=0;
        for(x; x< grid_size; x+=stride){
            let z = parseInt((perlin.get(x,y)+1)*360);
            console.log(x, y, z/360)

            collor = 'hsl('+z+',50%,50%)';
            var geometry = new THREE.PlaneGeometry(stride,stride,z);
            var material = new THREE.LineBasicMaterial( { color: collor} );
            var box = new THREE.Mesh( geometry, material );
            scene.add( box );
            // box.rotation.x = -90;
            box.position.x=0
            box.position.y=0
            box.position.z=0
            box.position.x += x;
            box.position.y += y;
            box.position.z = 0;
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