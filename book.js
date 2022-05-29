const section = document.querySelector('section.book');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient)

const light = new THREE.DirectionalLight( 0xffffff)
light.position.set(0,0,6)
scene.add(light)

const loader = new THREE.TextureLoader()

const urls = [
    "./assets/edge.png", "./assets/spine.png",
    "./assets/top.png", "./assets/bottom.png",
    "./assets/front.png", "./assets/back.png"
]

const materials = urls.map((url) => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url)
    })
})

const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5 );

const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 6;

let currentTimeline = window.pageYOffset / 1500;
let aimTimeline = window.pageYOffset / 1500;

function animate() {
	requestAnimationFrame( animate );

    currentTimeline += (aimTimeline - currentTimeline) * 0.1

    const rx = currentTimeline * 0.25 - 0.25
    const ry = (currentTimeline * 0.95 + 0.05) * Math.PI * 2

    cube.position.x = 3 - (currentTimeline * 3)
    cube.rotation.set(rx, ry,0)
    
	renderer.render( scene, camera );
}
animate();

window.addEventListener('scroll', () => {
    aimTimeline = window.pageYOffset / 1500;
})