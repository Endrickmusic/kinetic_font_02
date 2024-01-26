import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

function SetCamera({initialPosition, initialRotation}){
    
      const { camera, controls } = useThree()
    console.log(camera)
      camera.rotation.set(...initialRotation)
      // Set initial position
      camera.position.set(...initialPosition)
    
      // Set initial rotation (look-at target)
      if (controls) {
        // controls.target.set(...initialTarget)
      } else {
        // If controls are not available, manually set rotation
        // const lookAtTarget = new Vector3(...initialTarget)
        // camera.lookAt(lookAtTarget)
      }
    }

export default SetCamera 