import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, CameraControls, SoftShadows } from '@react-three/drei'
import { useControls, Leva, buttonGroup, button } from 'leva'

import './index.css'

import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloor.jsx'
import TextIn3D from './TextIn3D.jsx'
import TroikaText from './TroikaText.jsx'
import Ground from './Ground.jsx'

function LightAnimation({config}){

  const lightRef =  useRef()

  useFrame((state, delta) => {
    const rotSpeed = .05
    lightRef.current.position.x += Math.sin(state.clock.getElapsedTime()) * config.rotSpeed
    lightRef.current.position.z += Math.cos(state.clock.getElapsedTime()) * config.rotSpeed
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

const cameraControlsRef = useRef()

  const config = useControls('What is this', {
    backgroundColor : '#c1efef',
    lightIntensity : { value: 1, min: 0.0001, max: 14, step: 0.00001 },
    softShadowSize : { value: 25, min: 0.0, max: 100.0, step: 1.0 },
    softShadowSamples : { value: 10, min: 1, max: 20, step: 1 },
    softShadowFocus : { value: 0, min: 0, max: 2, step: 0.01 },
    floorSize : { value: 10, min: 1, max: 20, step: 1 },
    rotSpeed : { value: 0, min: 0, max: 10, step: 0.1 },

    thetaGrp: buttonGroup({
      label: 'rotate theta',
      opts: {
        '+45º': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
        '-90º': () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
        '+360º': () => cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true)
      }
    }),
    phiGrp: buttonGroup({
      label: 'rotate phi',
      opts: {
        '+20º': () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
        '-40º': () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true)
      }
    }),
    saveState: button(() => cameraControlsRef.current?.saveState()),
    reset: button(() => cameraControlsRef.current?.reset(true)),
    enabled: { value: true, label: 'controls on' }
  })

  return (
  <>
    <Leva />
    <Canvas 
    shadows
    camera={{ 
     

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
    {/* <Environment files="./Environments/envmap.hdr" />*/}
      
    <color attach="background" args={[config.backgroundColor]} />
      
    <LightAnimation config={config}/>

    {/* <AddFloor config={config}/> */}
      
    <Ground />

    <AddText />

    <TextIn3D />

    <ShaderText />

    <TroikaText />

  </Canvas>
  </>
  )
}

export default App;

