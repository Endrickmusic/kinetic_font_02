import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

import './index.css'

import ShaderText from './ShaderText.jsx'


function App() {

  function Rig() {
    const { camera } = useThree()
    const vec = new Vector3()
  
    return useEffect(() => {
      camera.lookAt(0, 0, 0)
    }), []
  }

  return (
  <>
    <Canvas 
    camera={{ 
    position: [0, 0, 2],
    fov: 40 }}    
    >
    <OrbitControls/>
    <Rig />

    <color attach="background" args={[0x000000]} />
      
    <directionalLight 
      position={[-1,0,0.5]}
      intensity={[16]}
      />

    <ambientLight />

    <ShaderText />

  </Canvas>
  </>
  )
}

export default App;

