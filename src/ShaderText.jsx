import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, MeshDepthMaterial, RGBADepthPacking } from 'three'
import { useRef } from 'react'


export default function Model() {

  const planeRef = useRef()
  const refMaterial = useRef()

   const customUniforms = {
        uTime: { value: 0 }
    }

    useFrame((state, delta) => {
      customUniforms.uTime.value += 0.01
    })

    const onBeforeCompile = (shader) => 
    {
    shader.uniforms.uTime = customUniforms.uTime

    shader.vertexShader = 
        `
            uniform float uRotateSpeed;
            uniform float uTwists;
            uniform float uRadius;
            uniform vec3 uMin;
            uniform vec3 uMax;
     
            uniform float uTime;

            varying vec2 vUv;
      
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
                float xx = mapRange(position.x, .01, 1.5, -1.0, 1.9);
                // // ------> Hier werden die Normals aktualisiert
                // //   objectNormal = rotate(objectNormal, vec3(1.,0.,0.), 0.5*PI*uTwists*xx + 0.01*uTime*uTwistSpeed);
                
                //   objectNormal = rotate(objectNormal, vec3(1.,0.,0.), 0.5*PI);
          
                //   // circled normal
                //   objectNormal = rotate(objectNormal, vec3(0.,0.,1.), (0.01*uTime*uRotateSpeed)*PI);
            `
        )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            vec3 pos = transformed;
        // float theta = (0.01*uTime*uRotateSpeed)*PI;
        float theta = (xx + 0.01)*PI;
        
        // ----> Hier wird die Rotation bestimmt

        // pos = rotate(pos,vec3(1.,0.,0.), 0.5*PI*uTwists + 0.01*uTime*uTwistSpeed);
        // pos = rotate(pos,vec3(1.,0.,0.), 0.5 * uTwists * PI);
        pos = rotate(pos,vec3(0.,1.,0.), 2. * PI + 0.11);

        vec3 dir = vec3(sin(theta), cos(theta), pos.z);
        // vec3 circled = vec3(dir.xy*uRadius,pos.z) + vec3(pos.y*dir.x,pos.y*dir.y,0.);
        // vec3 circled = vec3(dir.xy*10., pos.z) + vec3(pos.y*dir.x,pos.y*dir.y,0.);
        vec3 circled = vec3(pos.xy*2., pos.z) + vec3(pos.y*dir.x, pos.y*dir.y, 0.);

        transformed = circled;
        // transformed = pos;
        `
     )
     refMaterial.current.userData.shader = shader
    }

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
        Lorem ipsum dolor sit amet
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
