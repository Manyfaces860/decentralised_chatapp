import React,{ Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'
import { Cube } from '@/models/Good'
// import './thrower.css'

const Thrower = () => {
  return (
    <div className='throwerDiv'>
        <Canvas >
            <Suspense >
                <OrbitControls/>
                <Cube scale={[1,1,1]} position={[-4,0,0]} />
            </Suspense>
        </Canvas>
    </div>
  )
}

export default Thrower