import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, SoftShadows } from '@react-three/drei'
import { useControls, Leva } from 'leva'

import './index.css'

import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloor.jsx'
import TextIn3D from './TextIn3D.jsx'
import TroikaText from './TroikaText.jsx'




function LightAnimation({config}){

  const lightRef =  useRef()

  useFrame((state, delta) => {
    const rotSpeed = .05
    lightRef.current.position.x += Math.sin(state.clock.getElapsedTime()) * rotSpeed
    lightRef.current.position.z += Math.cos(state.clock.getElapsedTime()) * rotSpeed
  })  
  return(

    <directionalLight 
    ref={lightRef}
    castShadow
    shadow-mapSize={1024}
    position={[0,5.0,0]}
    intensity={[config.lightIntensity]}
    />
  )
}


function App() {

  const config = useControls('What is this', {
    backgroundColor : '#c1efef',
    lightIntensity : { value: 1, min: 0.0001, max: 14, step: 0.00001 },
    softShadowSize : { value: 25, min: 0.0, max: 100.0, step: 1.0 },
    softShadowSamples : { value: 10, min: 1, max: 20, step: 1 },
    softShadowFocus : { value: 0, min: 0, max: 2, step: 0.01 },
    floorSize : { value: 10, min: 1, max: 20, step: 1 }
  })

  return (
  <>
    <Leva />
    <Canvas 
    shadows
    camera={{ 
    position: [0, 0, -5], 
    rotation: [0, 0, 0],
    fov: 40 }}    
    >
      
    <OrbitControls />
    <SoftShadows 
      size= {config.softShadowSize}
      focus= {config.softShadowFocus}
      samples= {config.softShadowSamples}
      /> 
    {/* <Environment files="./Environments/envmap.hdr" />*/}
      
    <color attach="background" args={[config.backgroundColor]} />
      
    // <LightAnimation config={config}/>

    <AddFloor config={config}/>
      
    <AddText />

    <TextIn3D />

    <ShaderText />

    <TroikaText />

  </Canvas>
  </>
  )
}

export default App;

