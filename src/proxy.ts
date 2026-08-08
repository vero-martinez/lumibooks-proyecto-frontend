/**
 * Proxy de Next.js para proteger rutas según el rol del usuario.
 * Se ejecuta en el servidor antes de renderizar cualquier página.
 *
 * Como se ejecuta en el servidor, no puede leer el Access Token que vive
 * en memoria (zustand) ni localStorage; por eso lee las cookies httpOnly
 * auth-token y auth-role que crea el BFF (app/api/auth).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas privadas y qué roles pueden acceder
const roleRoutes: Record<string, string[]> = {
    "/client": ["CLIENTE"],
    "/gestor": ["GESTOR"],
    "/admin": ["ADMIN"],
};

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Verificar si la ruta requiere autenticación
    const protectedRoute = Object.keys(roleRoutes).find((route) =>
        pathname.startsWith(route)
    );

    // Si no es ruta protegida, dejar pasar
    if (!protectedRoute) return NextResponse.next();

    // Leer token de la cookie
    const token = request.cookies.get("auth-token")?.value;

    // Si no hay token, redirigir al login
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Leer el rol de la cookie
    const role = request.cookies.get("auth-role")?.value;

    // Si el rol no tiene acceso a esta ruta, redirigir al home
    if (!role || !roleRoutes[protectedRoute].includes(role)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Aplicar middleware solo a estas rutas
    matcher: ["/client/:path*", "/gestor/:path*", "/admin/:path*"],
};