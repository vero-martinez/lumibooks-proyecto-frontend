/**
 * Helpers compartidos para los endpoints de autenticación.
 *
 * Se encargan de conectar Next.js (BFF) con Spring Boot:
 *
 * 1. Next.js recibe la petición del navegador.
 * 2. Envía la información al backend Spring Boot.
 * 3. Recibe los tokens generados por el backend.
 * 4. Crea las cookies httpOnly que almacenará el navegador.
 */

import { NextRequest, NextResponse } from "next/server";
import { AuthResponse } from "@/types/api.types";
import { env } from "@/lib/env";
import {
    AUTH_TOKEN_COOKIE,
    AUTH_ROLE_COOKIE,
    REFRESH_TOKEN_COOKIE,
    SESSION_COOKIE_OPTIONS,
    REFRESH_COOKIE_OPTIONS,
} from "./cookie-options";

/**
 * Expresión regular utilizada para extraer el valor del refresh token
 * desde el header Set-Cookie que devuelve Spring Boot.
 */
const REFRESH_COOKIE_RE = new RegExp(`^${REFRESH_TOKEN_COOKIE}=([^;]+)`);


/**
 * Envía una petición de login o registro al backend.
 *
 * Recibe:
 * - endpoint: ruta del backend a la que se enviará la petición.
 * - body: información enviada por el usuario (email, password, etc.).
 *
 * Después de una respuesta exitosa, crea las cookies de autenticación
 * mediante buildAuthResponse().
 */
export async function handleAuthRequest(
    endpoint: string,
    body: unknown
): Promise<NextResponse> {
    try {
        // Envía la petición desde Next.js hacia Spring Boot.
        const response = await fetch(
            `${env.apiUrl}${endpoint}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        // Intenta leer la respuesta del backend.
        // Si no existe un JSON válido, devuelve null.
        const data: AuthResponse | null = await response.json().catch(() => null);

        // Si Spring devuelve un error, se envía la misma respuesta al cliente.
        if (!response.ok) {
            return NextResponse.json(
                data ?? { message: "Error del servidor" },
                { status: response.status }
            );
        }

        // Si todo salió bien, crea la respuesta con las cookies.
        return buildAuthResponse(data as AuthResponse, response);

    } catch {
        // Error de conexión, servidor caído, etc.
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}


/**
 * Renueva la sesión del usuario.
 *
 * Flujo:
 *
 * 1. Obtiene el refresh_token de la cookie del navegador.
 * 2. Envía ese token a Spring Boot.
 * 3. Spring genera un nuevo Access Token.
 * 4. Next.js actualiza nuevamente las cookies.
 */
export async function handleRefreshRequest(
    request: NextRequest
): Promise<NextResponse> {

    // Obtiene el refresh token guardado en la cookie httpOnly.
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    // Si no existe refresh token, no hay sesión que renovar.
    if (!refreshToken) {
        return NextResponse.json(
            { message: "No hay una sesión activa" },
            { status: 401 }
        );
    }

    try {
        // Envía el refresh token al backend.
        // Spring lo utiliza para validar la sesión y generar
        // un nuevo Access Token.
        const response = await fetch(`${env.apiUrl}/api/public/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                // Se envía manualmente porque esta llamada ocurre
                // entre servidores (Next.js -> Spring),
                // no directamente desde el navegador.
                Cookie: `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
            },
        });

        const data: AuthResponse | null = await response.json().catch(() => null);

        if (!response.ok) {
            return NextResponse.json(
                data ?? { message: "Error del servidor" },
                { status: response.status }
            );
        }

        return buildAuthResponse(data as AuthResponse, response);

    } catch {
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}


/**
 * Construye la respuesta final que recibe el navegador.
 *
 * Agrega:
 * - Access Token
 * - Rol del usuario
 * - Refresh Token
 *
 * Cada uno se almacena como cookie httpOnly.
 */
function buildAuthResponse(
    data: AuthResponse,
    response: Response
): NextResponse {

    // Crea la respuesta JSON que será enviada al frontend.
    const nextResponse = NextResponse.json(data, {
        status: response.status,
    });


    // Guarda el Access Token en una cookie.
    nextResponse.cookies.set(
        AUTH_TOKEN_COOKIE,
        data.token,
        SESSION_COOKIE_OPTIONS
    );


    // Guarda el rol del usuario para que el middleware
    // pueda validar permisos de acceso.
    nextResponse.cookies.set(
        AUTH_ROLE_COOKIE,
        data.role,
        SESSION_COOKIE_OPTIONS
    );


    // Obtiene el refresh token que Spring envió en Set-Cookie.
    const refreshToken = extractRefreshToken(response);


    // Si existe, lo guarda en una cookie httpOnly.
    if (refreshToken) {
        nextResponse.cookies.set(
            REFRESH_TOKEN_COOKIE,
            refreshToken,
            REFRESH_COOKIE_OPTIONS
        );
    }


    return nextResponse;
}


/**
 * Extrae el refresh token desde el header Set-Cookie del backend.
 */
function extractRefreshToken(response: Response): string | null {

    // Obtiene todos los headers Set-Cookie enviados por Spring.
    const headers = response.headers as Headers & {
        getSetCookie?: () => string[];
    };

    const setCookies = headers.getSetCookie?.() ?? [];


    // Busca la cookie que contiene el refresh token.
    for (const header of setCookies) {
        const match = header.match(REFRESH_COOKIE_RE);

        if (match) {
            // Devuelve solamente el valor del token.
            return match[1];
        }
    }


    // Si no encuentra la cookie, devuelve null.
    return null;
}