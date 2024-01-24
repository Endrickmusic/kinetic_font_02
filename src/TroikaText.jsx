import { extend } from '@react-three/fiber'
import { Text } from 'troika-three-text'
import { DoubleSide } from 'three'

extend({ Text });

export default function (){ 

    const TEXT2 = ['Christian ', 'Hohenbild ', 'Endrick ', 'Portfolio ']    

return (
    <text
          castShadow
          position={[ 1, -.9,-4 ]}
          rotation={[0.5*Math.PI,Math.PI,0]}
          text={TEXT2}
          maxWidth= {10}
          // fontSize={12}
          scale={2.0}
        >
         
          <meshPhongMaterial 
          attach="material" 
          color={"black"} 
          side={DoubleSide}
          />   
    </text>
    )
}