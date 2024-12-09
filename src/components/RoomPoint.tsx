'use client';

import { Html } from '@react-three/drei';
import { useState } from 'react';

type RoomPointProps = {
    position: [number, number, number];
    onClick: () => void;
    label: string; // Texto a ser exibido no hover
};

export default function RoomPoint({ position, onClick, label }: RoomPointProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <mesh position={position}>
            <Html center>
                <div
                    className="relative w-4 h-4 bg-white rounded-full cursor-pointer hover:bg-gray-300 border-gray-500 border-2"
                    onMouseEnter={() => setHovered(true)} // Mostra o texto no hover
                    onMouseLeave={() => setHovered(false)} // Esconde o texto ao sair
                    onClick={onClick}
                >
                    {hovered && (
                        <div
                            className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded-md"
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {label}
                        </div>
                    )}
                </div>
            </Html>
        </mesh>
    );
}
