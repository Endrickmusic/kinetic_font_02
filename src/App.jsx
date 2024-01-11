import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MSDFTextGeometry, MSDFTextMaterial } from 'three-msdf-text-utils';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import './index.css';
import Experience from './Experience.jsx'

import atlasURL from './font/BagossStandard-Regular.png';
import fnt from './font/BagossStandard-Regular-msdf.json';

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const groupRef = useRef();

  const initializeFont = async () => {
    const [atlas] = await Promise.all([loadFontAtlas(atlasURL)]);
    const loader = new FontLoader();
    // const font = loader.parse(fnt);
    const geometry = new MSDFTextGeometry({
      text: 'Hello World',
      font: fnt,
    })
    const material = new MSDFTextMaterial()
    material.uniforms.uMap.value = atlas
    const mesh = new THREE.Mesh(geometry, material)
  }

  const loadFontAtlas = (path) => {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader();
      loader.load(path, resolve);
    })
  }

  // Use useEffect to call initializeFont once the component is mounted
  useEffect(() => {
    initializeFont();
  }, []);

  return (
    <Canvas camera = {{ position: [0, 0, -5], fov: 40 }}>
      <Environment files="./Environments/envmap.hdr" />
        <color attach="background" args={['#c1efef']} />
      <Experience />
    </Canvas>
  );
}

export default App;
