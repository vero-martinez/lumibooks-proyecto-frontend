/**
 * Endpoint interno de Next.js para el registro.
 * Delega la lógica al helper compartido de autenticación.
 */

import { NextRequest } from "next/server";
import { handleAuthRequest } from "../helpers";

export async function POST(request: NextRequest) {
    const body = await request.json();
    return handleAuthRequest("/api/public/auth/register", body);
}