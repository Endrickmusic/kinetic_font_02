import { DoubleSide } from 'three'
import { useTexture } from '@react-three/drei'

export default function Floor({config}) {

    return (
        <mesh 
        position = {[0, -1,0]}
        rotation-x={-Math.PI / 2} receiveShadow>
            <planeGeometry args={[config.floorSizeX, config.floorSizeY]} />
            <meshStandardMaterial 
            color={'#ffffff'}
            side={DoubleSide}
            metalness={0.0} 
            />
        </mesh>
    )
  }