/**
 * Ruta interna de Next.js para cerrar sesión.
 *
 * Delega la invalidación de la sesión al helper de autenticación
 * y elimina las cookies de autenticación del navegador.
 */

import { NextRequest } from "next/server";
import { handleLogoutRequest } from "../helpers";

export async function POST(request: NextRequest) {
    return handleLogoutRequest(request);
}