import React, { useState, useRef, useEffect } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Text3D, Text, SoftShadows } from '@react-three/drei'
import * as THREE from 'three'

import './index.css'
import Experience from './Experience.jsx'
import ShaderText from './ShaderText.jsx'
// import { Text } from 'troika-three-text'


// extend({ Text });


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
      // shadowMap={{ type: THREE.PCFSoftShadowMap }}
      position={[0,2,0]}
      />

      <Floor />

      <Experience />
    

      {/* <text
          castShadow
          position={[ 1, -.8,-2 ]}
          rotation={[0.5*Math.PI,Math.PI,0]}
          text={TEXT2}
          maxWidth= {10}
          // fontSize={12}
          scale={2.0}
        >
         
          <meshPhongMaterial 
          attach="material" 
          color={"black"} 
          side={THREE.DoubleSide}
          />
         
        </text> */}

        <ShaderText />

    </Canvas>
  );
}

export default App;

