import React, { useState, useRef, useEffect } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Text3D, Text, SoftShadows } from '@react-three/drei'
import * as THREE from 'three'
// import { Text } from 'troika-three-text'

import './index.css'

import Experience from './Experience.jsx'
import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloor.jsx'

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

      <Experience />
      
      <AddText 
      planeRef ={planeRef}
      />


      <mesh
        castShadow
        ref = {planeRef}
        position = {[ 2,.2,-1 ]}
        rotation={[0.5 * Math.PI, 0.5 * Math.PI, 0 ]}
        >
          <planeGeometry 
            args={[ 1, .6 ]}
            />
          <meshNormalMaterial 
            castShadow
            side = {THREE.DoubleSide}
          />
        </mesh> 

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
        
        <Text3D
          castShadow
          position={[ 1, -0.2,-1 ]}
          rotation={[0.5*Math.PI,Math.PI,0]}
          curveSegments={5}
          bevelEnabled
          bevelSize={0.004}
          bevelThickness={0.0001}
          height={0.001}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={0.5}
          font="/Inter_Bold.json">
          {`hello\nworld`}
          <meshNormalMaterial />
        </Text3D>

        <ShaderText />

    </Canvas>
  );
}

export default App;

