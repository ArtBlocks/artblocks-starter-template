let camera, scene, renderer;
let geometry, material, mesh;
let pink =  new THREE.Color(0xecb4b2);
let green = new THREE.Color(0x849394);
let blue = new THREE.Color(0x8abed7);
let yellow = new THREE.Color(0xf0edb2);
let black = new THREE.Color(0x383838);
let white = new THREE.Color(0xfffff);

class CustomSinCurve extends THREE.Curve {

    constructor( scale = 1 ) {

        super();

        this.scale = scale;

    }

    getPoint( t, optionalTarget = new THREE.Vector3() ) {

        const tx = t - 1.5;
        const ty = t - 1.5;
        const tz = 0;

        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

    }

}

init();

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth,window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    geometry = new THREE.BoxGeometry(1, 1.5, .2);
    material = new THREE.MeshLambertMaterial({color:pink});
    
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
    
        camera.updateProjectionMatrix();
    })
    
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    mesh.rotateZ(10);
    scene.add(mesh);

    const path2 = new CustomSinCurve( .4 );
    const geometry2 = new THREE.TubeGeometry( path2, 100, .05, 8, false );
    const material2 = new THREE.MeshBasicMaterial( { color: black } );
    const mesh2 = new THREE.Mesh( geometry2, material2 );
    scene.add( mesh2 );
    
    let light = new THREE.PointLight(0xFFFFFF, .5, 1000)
    light.position.set(0,0,0);
    scene.add(light);
    
    light = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light.position.set(15,0,25);
    scene.add(light);
    let animation =
        function( time ) {

            mesh.rotation.z = time / 5000;
            mesh.rotation.y = time / 5000;

            renderer.render( scene, camera );
        }
        
    let render = function() {
        requestAnimationFrame(render);
        renderer.setAnimationLoop( animation );
    }
    
    render();
}




