import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MSDFTextGeometry, MSDFTextMaterial } from 'three-msdf-text-utils';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import './index.css';
import Experience from './Experience.jsx';

import atlasURL from './font/BagossStandard-Regular.png';
import fnt from './font/BagossStandard-Regular-msdf.json';

function AddText() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [textProperties, setTextProperties] = useState(null);

  const initializeFont = async () => {
    const [atlas] = await Promise.all([loadFontAtlas(atlasURL)]);
    const loader = new FontLoader();
    // const font = loader.parse(fnt);
    const geometry = new MSDFTextGeometry({
      text: 'ABCDEF',
      font: fnt,
    });
    const material = new MSDFTextMaterial();
    material.uniforms.uMap.value = atlas;
    const mesh = new THREE.Mesh(geometry, material);
    return { geometry, material, mesh };
  };

  const loadFontAtlas = (path) => {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader();
      loader.load(path, resolve);
    });
  };

  useEffect(() => {
    const initialize = async () => {
      const properties = await initializeFont();
      setTextProperties(properties);
      setFontLoaded(true);
    };

    initialize();
  }, []);

  return (
    <group>
      {fontLoaded && textProperties && (
        <mesh
          castShadow
          receiveShadow
          material={textProperties.material}
          geometry={textProperties.geometry}
          position={[1, 0, 0]}
          scale={0.1}
          rotation={[Math.PI, 0.2 * Math.PI, 0]}
        >
        </mesh>
      )}
    </group>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, -5], fov: 40 }}>
      <Environment files="./Environments/envmap.hdr" />
      <color attach="background" args={['#c1efef']} />
      <Experience />
      <AddText />
    </Canvas>
  );
}

export default App;
