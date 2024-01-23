import { Text3D } from '@react-three/drei'

export default function(){

return(

<Text3D
castShadow
position={[ 1, -0.2,-1 ]}
rotation={[0.5*Math.PI,Math.PI,0]}
curveSegments={5}
bevelEnabled
bevelSize={0.004}
bevelThickness={0.0001}
height={0.001}
lineHeight={0.5}
letterSpacing={-0.06}
size={0.5}
font="/Inter_Bold.json">
{`hello\nworld`}
<meshNormalMaterial />
</Text3D>
)
}