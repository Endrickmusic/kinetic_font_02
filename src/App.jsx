import React, { useState, useRef, useEffect } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Text3D, Text, SoftShadows } from '@react-three/drei'
import * as THREE from 'three'
// import { Text } from 'troika-three-text'

import './index.css'

import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloor.jsx'
import TextIn3D from './TextIn3D.jsx'

// extend({ Text });


function App() {

  const planeRef = useRef()
  const TEXT2 = ['Christian ', 'Hohenbild ', 'Endrick ', 'Portfolio ']

  return (
    <Canvas 
    shadows
    camera={{ position: [0, 0, -5], fov: 40 }}>
      
    <OrbitControls />
    <SoftShadows 
      size= {20}
      focus= {1}
      samples= {20}

      />
    {/* <Environment files="./Environments/envmap.hdr" /> */}
      
    <color attach="background" args={['#c1efef']} />
      
    <directionalLight 
      castShadow
      shadows={{ type: THREE.PCFSoftShadowMap }}
      shadow-mapSize={1024}
      position={[0,2,0]}
      />

    <AddFloor />
      
    <AddText />

    <TextIn3D />

    <ShaderText />

  </Canvas>
  );
}

export default App;

