/**
 * Endpoint interno de Next.js para renovar la sesión.
 *
 * Obtiene el refresh token desde la cookie httpOnly
 * y delega la renovación al helper compartido.
 */

import { NextRequest } from "next/server";
import { handleRefreshRequest } from "../helpers";

export async function POST(request: NextRequest) {
    return handleRefreshRequest(request);
}