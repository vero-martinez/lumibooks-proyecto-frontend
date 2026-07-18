/**
 * Servicio público de suscripción al newsletter.
 * Se encarga de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import { 
    SubscribeRequest, 
    SubscribeResponse 
} from "@/features/subscribers/types";

/**
 * Suscribe un email al newsletter desde la landing page.
 */
export async function subscribeService(request: SubscribeRequest): Promise<SubscribeResponse> {
  const { data } = await api.post("/api/public/subscribers/subscribe", request);
  return data;
}