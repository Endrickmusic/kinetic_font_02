import React from 'react'
import { Text, useEnvironment } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import { DoubleSide, MeshDepthMaterial, RGBADepthPacking, TextureLoader } from 'three'
import { useRef } from 'react'


export default function Model(props) {

  const planeRef = useRef()

   const customUniforms = {
        uTime: { value: 0 }
    }

    useFrame((state, delta) => {
      customUniforms.uTime.value += 0.01
    })

    const onBeforeCompile = (shader) => 
    {
    shader.uniforms.uTime = customUniforms.uTime

    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle)
            {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
        `
        )

    shader.vertexShader = shader.vertexShader.replace(
            '#include <beginnormal_vertex>',
            `
                #include <beginnormal_vertex>
    
                float angle = sin(position.y + uTime) * 0.2;
                mat2 rotateMatrix = get2dRotateMatrix(angle);
    
                objectNormal.xz = rotateMatrix * objectNormal.xz;
            `
        )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            transformed.xz = rotateMatrix * transformed.xz;
        `
     )
    }

    const depthMaterial = new MeshDepthMaterial({
      depthPacking: RGBADepthPacking
    })

    depthMaterial.onBeforeCompile = (shader) =>
    {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            transformed.x += 1.0;
        `
     )
    }


    const normalTexture = useLoader(TextureLoader, './Textures/waternormals.jpeg')
    const envMap = useEnvironment({files : './Environments/envmap.hdr'})

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
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore
      
      
        <meshStandardMaterial 
        onBeforeCompile = { onBeforeCompile }
        color = { 0xf4c400 }
        envMap = { envMap }
        normalMap = { normalTexture }
        normalScale = { [0.07, 0.07] }
        roughness = { 0.16 }
        metalness = { 1 }
        side = { DoubleSide }
        customDepthMaterial = { depthMaterial }
        />
        
        </Text>   
      
    </group>
  )
}
