/**
 * Función helper compartida para los endpoints de autenticación.
 * Llama al backend Spring Boot, crea las cookies httpOnly
 * y retorna la respuesta al cliente.
 */

import { NextResponse } from "next/server";
import { AUTH_COOKIE_OPTIONS } from "./cookie-options";
import { AuthResponse } from "@/types/api.types";
import { env } from "@/lib/env";

export async function handleAuthRequest(
    endpoint: string,
    body: unknown
): Promise<NextResponse> {
    try {
        const response = await fetch(
            `${env.apiUrl}${endpoint}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const data: AuthResponse = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        const nextResponse = NextResponse.json(data);

        nextResponse.cookies.set("auth-token", data.token, {
            ...AUTH_COOKIE_OPTIONS,
            maxAge: 60 * 60 * 24, // 1 día
        });

        nextResponse.cookies.set("auth-role", data.role, {
            ...AUTH_COOKIE_OPTIONS,
            maxAge: 60 * 60 * 24, // 1 día
        });

        return nextResponse;
    } catch {
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}