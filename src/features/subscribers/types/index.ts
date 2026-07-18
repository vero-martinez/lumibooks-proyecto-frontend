/**
 * Tipos del módulo de suscriptores.
 */

// Datos enviados al backend para suscribirse a la newsletter
export interface SubscribeRequest {
  email: string;
}

// Datos recibidos del backend al suscribirse a la newsletter
export interface SubscribeResponse {
  message: string;
}