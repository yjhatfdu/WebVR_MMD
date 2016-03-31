/**
 * Created by yjh on 16/3/30.
 */
///<reference path="../../typings/threejs/three.d.ts"/>
System.register(['../../app/MMD'], function(exports_1) {
    var MMD_1;
    var Vector3, scene, camera, renderer, alight, dirLight, controls;
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    return {
        setters:[
            function (MMD_1_1) {
                MMD_1 = MMD_1_1;
            }],
        execute: function() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 'antialias': true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            camera.position.z = 15;
            alight = new THREE.AmbientLight('#FFFFFF', 0.6);
            dirLight = new THREE.DirectionalLight('#FFFFFF', 0.5);
            dirLight.translateZ(1);
            dirLight.translateX(1);
            scene.add(dirLight);
            scene.add(alight);
            controls = new THREE['OrbitControls'](camera, renderer.domElement);
            //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
            //controls.enableDamping = true;
            //controls.dampingFactor = 0.25;
            //controls.enableZoom = false;
            MMD_1.MMD.create('model/Miku_Hatsune_Ver2.pmd').then(function (mmd) {
                scene.add(mmd);
                window['mmd'] = mmd;
                mmd.scale.set(0.8, 0.8, 0.8);
                mmd.translateY(-5);
                render();
            });
        }
    }
});
//# sourceMappingURL=test.js.map