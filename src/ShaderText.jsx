import React from "react";
import { Text, useEnvironment } from "@react-three/drei";
import { useLoader, useFrame } from '@react-three/fiber'
// import { TextureLoader } from '/node_modules/three/src/loaders/TextureLoader'
import { DoubleSide, MeshDepthMaterial, RGBADepthPacking, TextureLoader, MeshStandardMaterial } from "three"
import { useRef } from "react"
import { createDerivedMaterial } from 'troika-three-utils'

export default function Model(props) {

  const customMaterial = createDerivedMaterial(
    new MeshStandardMaterial,
    {
      timeUniform: 'elapsed',
      // Add GLSL to tweak the vertex... notice this modifies the `position`
      // and `normal` attributes, which is normally not possible!
      vertexTransform: `
        float waveAmplitude = 0.1;
        float waveX = uv.x * PI * 4.0 - mod(elapsed / 300.0, PI2);
        float waveZ = sin(waveX) * waveAmplitude;
        normal.xyz = normalize(vec3(-cos(waveX) * waveAmplitude, 0.0, 1.0));
        position.z += waveZ;
      `
    }
  )

  const planeRef = useRef()

   const customUniforms = {
        uTime: { value: 0 }
    }

    useFrame((state, delta) => {
      customUniforms.uTime.value += 0.01
      // planeRef.current.rotation.x = planeRef.current.rotation.y += delta / 12

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
      rotation={[0.5*Math.PI, Math.PI , 0 ]}
      position = {[ 0,0,-2.5 ]}  
      // material = {customMaterial}  
      >
        hello world!
      
      
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
  );
}
