/**
 * Servicio público de banners para la landing page.
 * Se encarga de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import { BannerSlide } from "@/features/banners/types";

/**
 * Obtiene los banners activos para la landing page.
 */
export async function getBannersService(): Promise<BannerSlide[]> {
  const { data } = await api.get("/api/public/banners");
  return data;
}