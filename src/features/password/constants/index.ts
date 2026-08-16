/**
 * Textos y valores fijos del módulo de contraseña.
 * Centralizados para evitar strings hardcodeados en los componentes.
 */

export const CHANGE_PASSWORD_FORM = {
    title: "Cambiar contraseña",
    description: "Actualiza la contraseña de tu cuenta.",
    currentPasswordLabel: "Contraseña actual",
    newPasswordLabel: "Nueva contraseña",
    confirmPasswordLabel: "Confirmar nueva contraseña",
    newPasswordHint: "Debe tener al menos 8 caracteres.",
    warning:
        "Al cambiar tu contraseña se cerrará tu sesión actual y deberás volver a iniciar sesión.",
    edit: "Editar",
    cancel: "Cancelar",
    submit: "Actualizar contraseña",
    submitLoading: "Actualizando contraseña...",
} as const;