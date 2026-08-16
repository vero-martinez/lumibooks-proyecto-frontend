/**
 * Textos y valores fijos del módulo de direcciones.
 * Centralizados para evitar strings hardcodeados en los componentes.
 */

// Formulario y diálogo de dirección
export const ADDRESS_FORM = {
    createTitle: "Nueva dirección",
    editTitle: "Editar dirección",
    department: "Departamento",
    province: "Provincia",
    district: "Distrito",
    addressLine: "Dirección",
    addressLinePlaceholder: "Ej: Av. Los Álamos 123",
    reference: "Referencia",
    referencePlaceholder: "Ej: Casa blanca, cerca del parque",
    save: "Guardar",
    saving: "Guardando...",
    cancel: "Cancelar",
    selectDepartment: "Selecciona un departamento",
    selectProvince: "Selecciona una provincia",
    selectDistrict: "Selecciona un distrito",
    searchPlaceholder: "Buscar...",
    clearDepartment: "Limpiar departamento",
    clearProvince: "Limpiar provincia",
    clearDistrict: "Limpiar distrito",
    loadingProvinces: "Cargando provincias...",
    loadingDistricts: "Cargando distritos...",
    locationSection: "Ubicación",
    detailsSection: "Detalles de la dirección",
};

// Tarjeta de dirección
export const ADDRESS_CARD = {
    defaultBadge: "Predeterminada",
    notDefaultBadge: "No predeterminada",
    referencePrefix: "Ref: ",
    editLabel: (line: string) => `Editar dirección ${line}`,
    deleteLabel: (line: string) => `Eliminar dirección ${line}`,
    setDefaultLabel: (line: string) => `Establecer como predeterminada ${line}`,
};

// Icono compartido del módulo
export const ADDRESS_ICON_SIZE = 24;