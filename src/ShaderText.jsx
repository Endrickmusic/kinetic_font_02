import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { useRef, useLayoutEffect } from 'react'


export default function Model() {

  const textRef = useRef()
  const refMaterial = useRef()

  const fontSize = 0.2

  useLayoutEffect(() => {
    let shader = refMaterial.current.userData.shader
    if (shader) {
      shader.uniforms.uMin.value = textRef.current.geometry.boundingBox.min
      shader.uniforms.uMax.value = textRef.current.geometry.boundingBox.max
      shader.uniforms.uMax.value.x += fontSize / 6
    }
    customUniforms.uMin.value = textRef.current.geometry.boundingBox.min
    customUniforms.uMax.value = textRef.current.geometry.boundingBox.max
    // space after text
    customUniforms.uMax.value.x += fontSize / 6
    console.log(textRef.current.geometry.boundingBox)
  })

   const customUniforms = {
        uTime: { value: 0 },
        uMin: { value: { x: 0, y: 0, z: 0 } },
        uMax: { value: { x: 0, y: 0, z: 0 } },
        uRotateSpeed: { value: 0.1 },
        uRadius: { value: 3.2 }
    }

    useFrame((state, delta) => {
      customUniforms.uTime.value += 0.01
    })

    const onBeforeCompile = (shader) => 
    {
    shader.uniforms = {...customUniforms, ...shader.uniforms }  

    shader.vertexShader = 
        `
            uniform float uRotateSpeed;
            uniform float uRadius;
            uniform vec3 uMin;
            uniform vec3 uMax;    
            uniform float uTime;

            varying vec2 vUv;
            varying vec3 vObjectNormal;
      
            float PI = 3.141592653589793238;

          
              mat4 rotationMatrix(vec3 axis, float angle) {
                  axis = normalize(axis);
                  float s = sin(angle);
                  float c = cos(angle);
                  float oc = 1.0 - c;
              
               return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                        0.0,                                0.0,                                0.0,                                1.0);
        }
        
        vec3 rotate(vec3 v, vec3 axis, float angle) {
          mat4 m = rotationMatrix(axis, angle);
          return (m * vec4(v, 1.0)).xyz;
        } 

        float mapRange(float value, float min1, float max1, float min2, float max2) {
          // return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
          return clamp( min2 + (value - min1) * (max2 - min2) / (max1 - min1), min2, max2 );
        }

        `  + shader.vertexShader
      
    shader.vertexShader = shader.vertexShader.replace(
            '#include <beginnormal_vertex>',
            `
            #include <beginnormal_vertex>

            // map the text to the circumference

            float xx = mapRange(position.y, uMin.y, uMax.y, -1.0, 1.);

            // update normals

            objectNormal = rotate(objectNormal, vec3(1.,0.,0.), 0.5 * PI * xx);
            
            vObjectNormal = objectNormal;
            `
        )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            vec3 pos = transformed;

            float theta = (xx + uTime * uRotateSpeed) * PI;
        
            // rotate geometry around y axis
  
            pos = rotate(pos, vec3(1.,0.,0.), 0.5 * PI * xx);

            // transform direction vector

            float loops = 1.0;  // add artsy loops

            vec3 dir = vec3(pos.x, cos(theta), sin(theta * loops));

            vec3 circled = vec3(pos.x * 4. * uRadius, dir.yz * uRadius) + vec3(0., pos.y * dir.y, pos.z * dir.y);

            transformed = circled;

            vUv = uv;
        `
     )

     shader.fragmentShader = shader.fragmentShader.replace(
        
      `#include <common>`,
      `#include <common> 
      varying vec2 vUv;
      varying vec3 vObjectNormal;
    `
    )

    shader.fragmentShader = shader.fragmentShader.replace(
        
      `#include <dithering_fragment>`,
      `#include <dithering_fragment> 
      // gl_FragColor = vec4(1.,1.,1.,1.);
      // gl_FragColor = vec4(vUv,0.,1.);

      // Convert normal to RGB color (assuming normals are in the range [-1, 1])
      vec3 color = (vObjectNormal + 1.0) * 0.5; // Map [-1, 1] to [0, 1]
  
      // Output color
      // gl_FragColor = vec4(color, 1.0);
    `
    )
    
     refMaterial.current.userData.shader = shader
    }

  return (
    <group>
     
     <Text 
      castShadow
      ref={textRef}
      rotation={[1.5*Math.PI, 0 , 0 ]}
      position = {[ 0, 0, 0 ]}    
      maxWidth={1.2}
      fontSize={0.4}
      anchorX = {'center'}
      anchorY = {'middle'}
      glyphGeometryDetail = {16}
      >
        Hallo Nils, wie läufts?
        <meshStandardMaterial 
        onBeforeCompile = { onBeforeCompile }
        ref={refMaterial} 
        attach="material" 
        color = { 0xffffff }
        roughness = { 0.0 }
        metalness = { 0 }
        side = { DoubleSide }
        
        />
        
        </Text>   
      
    </group>
  )
}
