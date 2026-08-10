/**
 * Textos y valores fijos del módulo de perfil.
 * Centralizados para evitar strings hardcodeados en los componentes.
 */

// Encabezado de la tarjeta del perfil
export const PROFILE_CARD = {
    title: "Información personal",
    description: "Tus datos personales",
};

// Título del modo edición
export const PROFILE_EDITING_TITLE = "Editando información personal";

// Acciones del perfil
export const PROFILE_ACTIONS = {
    edit: "Editar",
    cancel: "Cancelar",
    save: "Guardar cambios",
    saving: "Guardando...",
};

// Labels de los campos del perfil
export const PROFILE_FIELD_LABELS = {
    firstName: "Nombre",
    lastName: "Apellido",
    cellphone: "Celular",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    dni: "DNI",
};

// Placeholders de los campos editables
export const PROFILE_PLACEHOLDERS = {
    firstName: "Violet",
    lastName: "Abdalla",
    cellphone: "999999999",
};

// Valor mostrado cuando el usuario no tiene celular registrado
export const CELLPHONE_FALLBACK = "No registrado";

// Suscripción al boletín
export const PROFILE_SUBSCRIPTION = {
    title: "Suscripción al boletín",
    subscribed: "Recibes novedades y promociones",
    notSubscribed: "No recibes novedades ni promociones",
    badgeSubscribed: "Suscrito",
    badgeNotSubscribed: "No suscrito",
};

// Tamaño de los iconos de las filas de información
export const INFO_ICON_SIZE = 17;