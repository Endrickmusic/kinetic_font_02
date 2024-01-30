import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

import './index.css'

import ShaderText from './ShaderText.jsx'
import AddFloor from './AddFloorSimple.jsx'


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
    position: [0, 11, 0],
    fov: 40 }}    
    >

    <Rig />

    <color attach="background" args={[0x000000]} />
      
    <directionalLight 
      position={[-1,2,0.5]}
      intensity={[16]}
      />

    {/* <AddFloor /> */}

    <ShaderText />

  </Canvas>
  </>
  )
}

export default App;

