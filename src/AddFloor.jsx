
export default function Floor() {
    return (
        <mesh 
        position = {[0, -1,0]}
        rotation-x={-Math.PI / 2} receiveShadow>
            <circleGeometry args={[10]} />
            <meshStandardMaterial 
            color={'white'}
            />
        </mesh>
    )
  }