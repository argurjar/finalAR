

import React, { useEffect } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { XRPlanes } from 'three/examples/jsm/webxr/XRPlanes';
import './App.css';

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    const planes = new XRPlanes(renderer);
    scene.add(planes);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.visible = false; // Initially hidden
    scene.add(boxMesh);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.setAnimationLoop(animate);

      // Update the box position and orientation based on detected surfaces
      if (planes.visible && planes.planes?.length > 0) {
        const [plane] = planes.planes;
        const { position, rotation } = plane;

        boxMesh.position.copy(position);
        boxMesh.rotation.copy(rotation);

        boxMesh.visible = true; // Show the box when a plane is detected
      } else {
        boxMesh.visible = false; // Hide the box when no plane is detected
      }

      renderer.render(scene, camera);
    }

    window.addEventListener('resize', onWindowResize);
    animate();

    document.body.appendChild(
      ARButton.createButton(renderer, {
        requiredFeatures: ['hit-test'],
      })
    );
  }, []);

  return (
    <div className="App">
      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener">
          three.js
        </a>{' '}
        ar - plane detection
        <br />
        (Chrome Android 81+)
      </div>
    </div>
  );
}

export default App;

















// import React, { useEffect } from 'react';
// import * as THREE from 'three';
// import { ARButton } from 'three/addons/webxr/ARButton.js';
// import { XRPlanes } from 'three/addons/webxr/XRPlanes.js';
// import './App.css';

// function App() {
//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.xr.enabled = true;
//     document.body.appendChild(renderer.domElement);

//     const planes = new XRPlanes(renderer);
//     scene.add(planes);

//     const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
//     light.position.set(0.5, 1, 0.25);
//     scene.add(light);

//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     function render() {
//       renderer.render(scene, camera);
//     }

//     window.addEventListener('resize', onWindowResize);

//     renderer.setAnimationLoop(render);

//     document.body.appendChild(
//       ARButton.createButton(renderer, {
//         requiredFeatures: ['plane-detection'],
//       })
//     );
//   }, []);

//   return (
//     <div className="App">
//       <div id="info">
//         <a href="https://threejs.org" target="_blank" rel="noopener">
//           three.js
//         </a>{' '}
//         ar - plane detection
//         <br />
//         (Chrome Android 81+)
//       </div>
//     </div>
//   );
// }

// export default App;
