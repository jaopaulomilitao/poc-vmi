'use client';

import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

export default function House() {
    const { scene } = useGLTF('models/house/house_with_interior.glb');


    return (
        <Suspense fallback={null}>
            <mesh castShadow receiveShadow>
                <primitive object={scene} scale={0.5} position={[0, -0.5, 0]} />
            </mesh>
        </Suspense>
    );
}
