import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "POC - Visualizador de Maquete 3D",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

{/* <OrbitControls
        enableDamping
        enablePan={false}
        enableZoom={false}
        dampingFactor={0.1}
        rotateSpeed={0.4}
        target={camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()))} // Foco na frente da câmera
      /> */}