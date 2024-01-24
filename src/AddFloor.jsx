import { DoubleSide } from 'three'

export default function Floor({config}) {
    return (
        <mesh 
        position = {[0, -1,0]}
        rotation-x={-Math.PI / 2} receiveShadow>
            <circleGeometry args={[config.floorSize]} />
            <meshStandardMaterial 
            color={'white'}
            side={DoubleSide}
            />
        </mesh>
    )
  }