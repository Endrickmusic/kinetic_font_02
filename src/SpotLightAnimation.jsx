import { useRef } from "react"
import { useFrame } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import { SpotLightHelper } from 'three'

export default function LightAnimation({config}){

    const lightRef =  useRef()
    useHelper(lightRef, SpotLightHelper, "red");
  
    useFrame((state, delta) => {
      const rotSpeed = .05
      lightRef.current.position.x = Math.sin(state.clock.getElapsedTime()) * config.rotSpeed
      lightRef.current.position.z = Math.cos(state.clock.getElapsedTime()) * config.rotSpeed
      // state.camera.rotation.z = -180 * DEG2RAD
    })  
    return(
  
      <spotLight 
      ref={lightRef}
      castShadow
      shadow-mapSize={1024}
      position={[0,2.0,0]}
      intensity={[config.lightIntensity]}
      />
    )
  }