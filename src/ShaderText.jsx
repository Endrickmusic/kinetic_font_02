import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, MeshDepthMaterial, RGBADepthPacking } from 'three'
import { useRef } from 'react'

// import { ShaderReplace } from './ShaderReplace.jsx'

export default function Model() {

  const planeRef = useRef()

  const customUniforms = {
       uTime: { value: 0 }
   }
  
   useFrame((state, delta) => {
     customUniforms.uTime.value += 0.01
   })
  

  // ShaderReplace()

  return (
    <group>
     
     <Text 
      castShadow
      ref={planeRef}
      rotation={[1.5*Math.PI, 0 , 0 ]}
      position = {[ 0,0,0 ]}    
      maxWidth={7}
      fontSize={0.4}
      >
        Lorem ipsum dolor sit amet, con- sectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore   eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril dele-   nit augue duis dolore
      
      
        <meshStandardMaterial 
        onBeforeCompile = { onBeforeCompile }
        color = { 0xffffff }
        roughness = { 0.0 }
        metalness = { 0 }
        side = { DoubleSide }
        />
        
        </Text>   
      
    </group>
  )
}
