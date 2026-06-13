/**
 * Tipos específicos del módulo de autenticación.
 * LoginFormData y RegisterFormData representan los datos
 * que el usuario escribe en los formularios.
 */

// Datos del formulario de login
export interface LoginFormData {
    email: string;
    password: string;
}

// Datos del formulario de registro
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dni: string;
    cellphone?: string; // opcional
    acceptsTerms: boolean;
    subscribedToNewsletter?: boolean; // opcional
}