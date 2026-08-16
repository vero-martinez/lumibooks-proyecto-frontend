/**
 * Endpoint interno de Next.js para restablecer la contraseña.
 * Delega al backend Spring Boot sin manejo de cookies (endpoint público).
 */

import { NextRequest } from "next/server";
import { handlePublicRequest } from "../helpers";

export async function POST(request: NextRequest) {
    const body = await request.json();
    return handlePublicRequest("/api/public/auth/reset-password", body);
}