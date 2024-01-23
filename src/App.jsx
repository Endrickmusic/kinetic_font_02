import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, SoftShadows } from '@react-three/drei'

import './index.css'

import ShaderText from './ShaderText.jsx'
import AddText from './AddText.jsx'
import AddFloor from './AddFloor.jsx'
import TextIn3D from './TextIn3D.jsx'
import TroikaText from './TroikaText.jsx'




function App() {

  return (
    <Canvas 
    shadows
    camera={{ 
    position: [0, 0, -5], 
    rotation: [0, 0, 0],
    fov: 40 }}
    
    >
      
    <OrbitControls />
    <SoftShadows 
      size= {20}
      focus= {1}
      samples= {20}

      />
    {/* <Environment files="./Environments/envmap.hdr" /> */}
      
    <color attach="background" args={['#c1efef']} />
      
    <directionalLight 
      castShadow
      shadow-mapSize={1024}
      position={[0,2,0]}
      />

    <AddFloor />
      
    <AddText />

    <TextIn3D />

    <ShaderText />

    <TroikaText />

  </Canvas>
  );
}

export default App;

