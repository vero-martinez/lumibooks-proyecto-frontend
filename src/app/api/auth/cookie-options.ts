/**
 * Opciones base para las cookies httpOnly de autenticación.
 * Se reutilizan en login/register (helpers.ts) y logout.
 */

export const AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
};