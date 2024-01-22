import React, { useState, useRef, useEffect } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Text3D, Text, SoftShadows } from '@react-three/drei'
import * as THREE from 'three'


import './index.css'
import Experience from './Experience.jsx'
import ShaderText from './ShaderText.jsx'


function Floor() {
  return (
      <mesh 
      position = {[0, -1,0]}
      rotation-x={-Math.PI / 2} receiveShadow>
          <circleGeometry args={[10]} />
          <meshStandardMaterial 
          color={'white'}
          />
      </mesh>
  )
}


function App() {

  const planeRef = useRef()
  const TEXT2 = ['Christian ', 'Hohenbild ', 'Endrick ', 'Portfolio ']

  return (
    <Canvas 
    shadows
    camera={{ position: [0, 0, -5], fov: 40 }}>
      
      <OrbitControls />
      {/* <SoftShadows 
      size= {20}
      focus= {1}
      samples= {20}

      /> */}
      {/* <Environment files="./Environments/envmap.hdr" /> */}
      
      <color attach="background" args={['#c1efef']} />
      
      <directionalLight 
      castShadow
      shadows={{ type: THREE.PCFSoftShadowMap }}
      shadow-mapSize={1024}
      // shadowMap={{ type: THREE.PCFSoftShadowMap }}
      position={[0,2,0]}
      />

      <Floor />

      <Experience />

        <ShaderText />

    </Canvas>
  );
}

export default App;

