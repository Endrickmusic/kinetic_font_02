import { useRef } from "react"
import { Canvas, useThree } from '@react-three/fiber'
import { CameraControls, SoftShadows } from '@react-three/drei'
import { useControls, Leva, } from 'leva'
import { Vector3 } from 'three'

import './index.css'

import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloorSimple.jsx'
import TextIn3D from './TextIn3D.jsx'
import TroikaText from './TroikaText.jsx'
// import LightAnimation from './SpotLightAnimation.jsx'
import LightAnimation from './DirLightAnimation.jsx'
import Ground from './Ground.jsx'



function App() {

  function Rig() {
    const { camera } = useThree()
    const vec = new Vector3()
  
    return useFrame(() => {
      camera.lookAt(0, 0, 0)
    })
  }

const cameraControlsRef = useRef()

  const config = useControls('What is this', {
    backgroundColor : '#ffffff',
    lightIntensity : { value: 6, min: 0.0001, max: 14, step: 0.00001 },
    softShadowSize : { value: 0.5, min: 0.0, max: 100.0, step: 1.0 },
    softShadowSamples : { value: 10, min: 1, max: 20, step: 1 },
    softShadowFocus : { value: 0, min: 0, max: 2, step: 0.01 },
    floorSizeX : { value: 17, min: 1, max: 20, step: 1 },
    floorSizeY : { value: 10, min: 1, max: 20, step: 1 }
  })

  return (
  <>
    <Leva collapsed/>
    <Canvas 
    shadows
    camera={{ 
    position: [6,3,5],
    fov: 40 }}    
    >
      
    <CameraControls 
      ref={cameraControlsRef}
    />

    <SoftShadows 
      size= {config.softShadowSize}
      focus= {config.softShadowFocus}
      samples= {config.softShadowSamples}
      /> 
      
    <color attach="background" args={[config.backgroundColor]} />
      
    <directionalLight 
      castShadow
      shadow-mapSize={1024}
      position={[-1,2,0.5]}
      intensity={[config.lightIntensity]}
      />

    <AddFloor config={config}/>

    <ShaderText />

  </Canvas>
  </>
  )
}

export default App;

