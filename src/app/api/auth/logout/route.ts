/**
 * Endpoint interno de Next.js para cerrar sesión.
 * Limpia las cookies httpOnly de autenticación.
 */

import { NextResponse } from "next/server";
import { AUTH_COOKIE_OPTIONS } from "../cookie-options";

export async function POST() {
    const response = NextResponse.json({ message: "Sesión cerrada" });

    response.cookies.set("auth-token", "", { ...AUTH_COOKIE_OPTIONS, maxAge: 0 });
    response.cookies.set("auth-role", "", { ...AUTH_COOKIE_OPTIONS, maxAge: 0 });

    return response;
}