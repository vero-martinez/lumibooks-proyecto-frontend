/**
 * Tipos del módulo de banners.
 */

// Datos recibidos del backend para mostrar los banners en la landing page
export interface BannerSlide {
  id: number;
  title: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  displayOrder: number;
}