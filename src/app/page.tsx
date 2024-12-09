'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useState, useCallback, useEffect } from 'react';
import House from '../components/House';
import RoomPoint from '../components/RoomPoint';
import { gsap } from 'gsap';
import { FlyControls } from '@react-three/drei';

function Scene({ setCameraInfo, setSelectedLabel }: { setCameraInfo: (info: { position: [number, number, number]; rotation: [number, number, number] }) => void, setSelectedLabel: (label: string | null) => void }) {
  const { camera, gl } = useThree();

  // Função que move a câmera para o RoomPoint
  const handleMoveCamera = useCallback(
    (position: [number, number, number], rotation: [number, number, number]) => {
      if (camera) {
        gsap.to(camera.position, {
          x: position[0],
          y: position[1],
          z: position[2],
          duration: 1.5,
          ease: 'power3.inOut',
          onUpdate: () => {
            setCameraInfo({
              position: [camera.position.x, camera.position.y, camera.position.z],
              rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            });
          },
        });
        gsap.to(camera.rotation, {
          x: rotation[0],
          y: rotation[1],
          z: rotation[2],
          duration: 1.5,
          ease: 'power3.inOut',
        });
      }
    },
    [camera, setCameraInfo]
  );

  // Mostra as informações da câmera, posição e rotação
  useEffect(() => {
    const updateInfo = () => {
      setCameraInfo({
        position: [camera.position.x, camera.position.y, camera.position.z],
        rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
      });
    };

    updateInfo();

    const interval = setInterval(updateInfo, 100);
    return () => clearInterval(interval);
  }, [camera, setCameraInfo]);

  return (
    <>

      {/* <OrbitControls
        enableDamping
        enablePan={false}
        enableZoom={false}
        dampingFactor={0.1}
        rotateSpeed={0.4}
        target={camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()))} // Foco na frente da câmera
      /> */}

      <FlyControls
        movementSpeed={5}
        rollSpeed={0.5}
        dragToLook={true}
      />

      <ambientLight intensity={0.1} />

      {/* Luz Direcional (simulando o sol) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={3}
        castShadow
      />


      {/* Componente House com sombras */}
      <House />

      {/* RoomPoints para navegar na cena */}
      <RoomPoint
        position={[0.5, 0, 1.28]}
        onClick={() => {
          handleMoveCamera([-0.13, 0.05, 1.01], [-3.02, -0.92, -3.06]);
          setSelectedLabel('Sala');
        }}
        label="Sala"
      />
      <RoomPoint
        label="Cozinha"
        position={[-0.5, -0.1, -0.3]}
        onClick={() => {
          handleMoveCamera([0.25, 0, 0.24], [-0.3, 0.85, 0.22]);
          setSelectedLabel('Cozinha');
        }}
      />
      <RoomPoint
        label="Quarto"
        position={[0, 1.3, 1.11]}
        onClick={() => {
          handleMoveCamera([-0.5, 1.67, 2.18], [-0.45, -0.58, -0.31]);
          setSelectedLabel('Quarto');
        }}
      />

      {/* Pós-processamento: Efeitos de Antialiasing, Bloom, Noise, e Distorção de Lente */}
      {/* <EffectComposer> */}
      {/* <Bloom intensity={2.6} radius={1.4} /> */}
      {/* Noise */}
      {/* <Noise opacity={0.03} /> */}
      {/* Distorção de Lente */}
      {/* <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // Modo de mistura
          offset={new THREE.Vector2(0.001, 0.001)} // Deslocamento de cor
          radialModulation={true} // Modulação radial
          modulationOffset={0.1} // Deslocamento de modulação
        /> */}
      {/* </EffectComposer> */}
    </>
  );
}


export default function Home() {
  const [cameraInfo, setCameraInfo] = useState({
    position: [0, 2, 5] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
  });
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  return (
    <div className="relative h-screen">
      <Canvas shadows camera={{ position: [5, 1, 4] }} className="bg-gradient-to-b from-blue-600 to-blue-500">
        <Scene setCameraInfo={setCameraInfo} setSelectedLabel={setSelectedLabel} />
      </Canvas>

      {/* Camada da UI */}
      {/* <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-md shadow-lg text-sm">
        <p>Position: {cameraInfo.position.map((n) => n.toFixed(2)).join(', ')}</p>
        <p>Rotation: {cameraInfo.rotation.map((n) => n.toFixed(2)).join(', ')}</p>
      </div> */}

      {/* Texto exibido no canto superior esquerdo */}
      {selectedLabel && (
        <div
          className="absolute top-0 left-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-gray-200 px-8 py-3 text-2xl w-screen transition-opacity duration-500 ease-in-out opacity-100 h-24"
          style={{ opacity: selectedLabel ? 1 : 0 }}
        >
          {selectedLabel}
        </div>
      )}
    </div>
  );
}
