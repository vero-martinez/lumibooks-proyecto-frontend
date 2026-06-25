import type { NextConfig } from "next";

// Configuración global de Next.js
const nextConfig: NextConfig = {
  /**
   * Permite que el componente Next/Image cargue imágenes
   * alojadas en Claudinary de forma segura y optimizada
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

};

export default nextConfig;