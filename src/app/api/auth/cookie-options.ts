/**
 * Configuración compartida de las cookies de autenticación.
 *
 * En esta arquitectura, Next.js (BFF) recibe los tokens de Spring Boot
 * y crea las cookies httpOnly que finalmente almacena el navegador.
 *
 * Se reutiliza en login, register, refresh y logout.
 */

// Nombres de las cookies

/**
 * Cookie que almacena el Access Token (JWT).
 * Se utiliza para autenticar las peticiones del usuario.
 */
export const AUTH_TOKEN_COOKIE = "auth-token";

/**
 * Cookie que almacena el rol del usuario.
 * El middleware la utiliza para proteger rutas.
 */
export const AUTH_ROLE_COOKIE = "auth-role";

/**
 * Cookie que almacena el Refresh Token.
 * Permite obtener un nuevo Access Token cuando este expira.
 */
export const REFRESH_TOKEN_COOKIE = "refresh_token";

/**
 * Duración de las cookies: 30 días.
 * Debe coincidir con la duración del Refresh Token del backend.
 */
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

/**
 * Configuración compartida para las cookies de sesión
 * (Access Token y rol).
 */
export const SESSION_COOKIE_OPTIONS = {
    // Solo el servidor puede acceder a la cookie.
    httpOnly: true,

    // En producción solo se envía por HTTPS.
    secure: process.env.NODE_ENV === "production",

    // Protección básica contra ataques CSRF.
    sameSite: "lax" as const,

    // Disponible en toda la aplicación.
    path: "/",

    // La cookie permanece almacenada durante 30 días.
    maxAge: REFRESH_MAX_AGE,
};

/**
 * Configuración de la cookie del Refresh Token.
 * Actualmente comparte la misma configuración que las cookies de sesión,
 * pero se mantiene separada por claridad.
 */
export const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: REFRESH_MAX_AGE,
};