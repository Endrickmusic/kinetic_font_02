import { DoubleSide } from 'three'
import { useTexture } from '@react-three/drei'

export default function Floor({config}) {

    const [floor, normal] = useTexture(['/Textures/SurfaceImperfections003_1K_var1.jpg', '/Textures/SurfaceImperfections003_1K_Normal.jpg'])

    return (
        <mesh 
        position = {[0, -1,0]}
        rotation-x={-Math.PI / 2} receiveShadow>
            <planeGeometry args={[config.floorSizeX, config.floorSizeY]} />
            <meshStandardMaterial 
            color={'white'}
            side={DoubleSide}
            normalMap={normal}
            roughnessMap={floor}
            metalness={0.4} 
            />
        </mesh>
    )
  }