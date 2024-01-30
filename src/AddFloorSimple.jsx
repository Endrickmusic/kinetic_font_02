import { DoubleSide } from 'three'

export default function Floor() {

    return (
        <mesh 
        position = {[0, -1,0]}
        rotation-x={-Math.PI / 2} receiveShadow>
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial 
            color={'#ffffff'}
            side={DoubleSide}
            metalness={0.0} 
            />
        </mesh>
    )
  }