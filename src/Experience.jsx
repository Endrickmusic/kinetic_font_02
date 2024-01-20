import { OrbitControls, RoundedBox } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
// import { MSDFTextGeometry, MSDFTextMaterial } from "three-msdf-text-utils"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         '

export default function Experience(){

  const normalM = useLoader(THREE.TextureLoader, "./Textures/waternormals.jpeg")

  


  return (
    <>
      {/* <OrbitControls />        */}
      <RoundedBox
          position={[1, 0.2, 1]}
          radius={0.01}
          castShadow
          >
          <meshStandardMaterial 
            metalness={1}
            roughness={0.12}
            normalMap={ normalM }
          />
       </RoundedBox>
    </>
  )}