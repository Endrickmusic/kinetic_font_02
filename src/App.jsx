import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, SoftShadows } from '@react-three/drei'
// import { useControls, Leva } from 'leva'

import './index.css'

// import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloor.jsx'
// import TextIn3D from './TextIn3D.jsx'
import TroikaText from './TroikaText.jsx'




function LightAnimation(){

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
    />
  )
}


function App() {

  // const options = useControls('What is this', {
  //   parameter1 : { value: 0.5, min: 0.01, max: 1.0, step: 0.01 },
  //   parameter2 : { value: 0.5, min: 0.01, max: 1.0, step: 0.01 }
  // })

  return (
  <>
    {/* <Leva /> */}
    <Canvas 
    shadows
    camera={{ 
    position: [0, 0, -5], 
    rotation: [0, 0, 0],
    fov: 40 }}    
    >
      
    <OrbitControls />
    <SoftShadows 
      size= {10}
      focus= {1}
      samples= {20}
      /> 
    {/* <Environment files="./Environments/envmap.hdr" />*/}
      
    <color attach="background" args={['#c1efef']} />
      
    // <LightAnimation />

    <AddFloor />
      
    <AddText />

    {/* <TextIn3D /> */}

    {/* <ShaderText /> */}

    <TroikaText />

  </Canvas>
  </>
  )
}

export default App;

