/**
 * Textos y valores fijos del módulo de checkout/órdenes.
 * Centralizados para evitar strings hardcodeados en los componentes.
 */

export const DEFAULT_PAGE_SIZE = 10;

// Pasos del checkout
export const CHECKOUT_STEPS = [
    { number: 1, label: "Envío" },
    { number: 2, label: "Pago" },
    { number: 3, label: "Revisión" },
] as const;

// Layout principal
export const CHECKOUT_LAYOUT = {
    backToCart: "Volver al carrito",
    stepOf: (current: number, total: number) => `Paso ${current} de ${total}`,
};

// Paso 1: Datos de envío
export const STEP_SHIPPING = {
    title: "Datos del envío",
    addressSection: "Dirección de envío",
    changeAddress: "Cambiar dirección",
    selectAddressTitle: "Seleccionar dirección",
    selectAddressDescription: "Elige la dirección donde quieres recibir tu pedido.",
    noAddresses: "No tienes direcciones guardadas",
    addFirstAddress: "Agrega una dirección para continuar con tu compra.",
    addAddress: "Agregar dirección",
    addressLimitReached: "Has alcanzado el límite de 5 direcciones.",
    addressLimitHint: "Elimina una dirección existente para poder agregar otra.",
    shippingNotAvailable: "No hay envío disponible para esta dirección.",
    shippingNotAvailableHint: "Elige otra dirección para poder completar tu compra.",
    shippingAvailable: "Envío disponible",
    recipientSection: "Datos del destinatario",
    recipientName: "Nombre del destinatario",
    recipientNamePlaceholder: "Ej: Juan Pérez",
    dni: "DNI",
    dniPlaceholder: "Ej: 12345678",
    phone: "Teléfono",
    phonePlaceholder: "Ej: 987654321",
    continue: "Continuar",
    defaultBadge: "Predeterminada",
    loadingAddresses: "Cargando direcciones...",
    referencePrefix: "Ref:",
    deleteTitle: "Eliminar dirección",
    deleteMessage: (name: string) => `¿Estás seguro de eliminar la dirección "${name}"?`,
    deleteConfirmLabel: "Eliminar",
};

// Paso 2: Datos de pago
export const STEP_PAYMENT = {
    title: "Datos del pago",
    cardSection: "Datos de la tarjeta",
    cardHolderFirstName: "Nombre del titular",
    cardHolderFirstNamePlaceholder: "Ej: Juan",
    cardHolderLastName: "Apellido del titular",
    cardHolderLastNamePlaceholder: "Ej: Pérez",
    cardNumber: "Número de tarjeta",
    cardNumberPlaceholder: "0000 0000 0000 0000",
    expiryDate: "Fecha de vencimiento",
    expiryDatePlaceholder: "MM/AA",
    cvv: "CVV",
    cvvPlaceholder: "Ej: 123",
    cvvHint: "3 o 4 dígitos en el reverso de tu tarjeta",
    back: "Volver",
    continue: "Continuar",
};

// Paso 3: Revisión
export const STEP_REVIEW = {
    title: "Revisión del pedido",
    shippingAddress: "Dirección de envío",
    recipientData: "Datos del destinatario",
    paymentData: "Datos de pago",
    items: "Productos",
    back: "Volver",
    confirmAndPay: "Confirmar y pagar",
    confirming: "Procesando...",
};

// Resumen de la orden (CheckoutSummary)
export const CHECKOUT_SUMMARY = {
    title: "Resumen de pedido",
    subtotal: "Subtotal",
    shipping: "Envío",
    shippingNotAvailable: "Envío no disponible",
    total: "Total",
    totalDash: "-",
    singleProduct: "1 producto",
    multipleProducts: (count: number) => `${count} productos`,
    quantityLabel: "Cantidad:",
};

// ─── Mis Pedidos ────────────────────────────────────────

import type { OrderStatus } from "@/features/orders/types";

// Labels legibles por estado
export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
    PENDIENTE: "Pendiente",
    EN_PREPARACION: "En preparación",
    ENVIADO: "Enviado",
    ENTREGADO: "Entregado",
};

// Opciones de filtro por status (tabs)
export const ORDER_FILTER_OPTIONS: readonly {
    value: OrderStatus | "";
    label: string;
}[] = [
    { value: "", label: "Todos" },
    { value: "PENDIENTE", label: "Pendiente" },
    { value: "EN_PREPARACION", label: "En preparación" },
    { value: "ENVIADO", label: "Enviado" },
    { value: "ENTREGADO", label: "Entregado" },
];

// Orden de los pasos del stepper de estado
export const ORDER_STATUS_STEPS: readonly OrderStatus[] = [
    "PENDIENTE",
    "EN_PREPARACION",
    "ENVIADO",
    "ENTREGADO",
];

// ─── Gestor: Gestión de pedidos ─────────────────────────

export const MANAGER_ORDERS = {
    title: "Gestión de pedidos",
    description: "Administra y actualiza el estado de los pedidos de los clientes.",
    loading: "Cargando pedidos...",
    error: "Error al cargar los pedidos",
    errorDescription: "No pudimos obtener los pedidos. Inténtalo de nuevo.",
    empty: "No se encontraron pedidos",
    emptyDescription: "No hay pedidos que coincidan con los filtros aplicados.",
    detailTitle: "PEDIDO",
    products: "Productos",
    shippingData: "Datos de envío",
    recipientData: "Datos del destinatario",
    summary: "Resumen",
    created: "Creado",
    updated: "Actualizado",
    quantityLabel: "Cant:",
    updateStatus: "Actualizar estado",
    searchPlaceholder: "Buscar por N° de pedido, DNI o nombre...",
    dateFrom: "Desde",
    dateTo: "Hasta",
    sortLabel: "Ordenar por",
    clientLabel: "Cliente",
    managerLabel: "Gestor",
    noManager: "Sin asignar",
    dateRangeLabel: "Rango de fechas",
} as const;

export const MANAGER_ORDER_SORT_OPTIONS = [
    { value: "createdAt,desc", label: "Más reciente" },
    { value: "createdAt,asc", label: "Más antiguo" },
] as const;

// ─── Admin: Gestión de pedidos ─────────────────────────

export const ADMIN_ORDERS = {
    title: "Pedidos",
    description: "Consulta y administra los pedidos de los clientes.",
    loading: "Cargando pedidos...",
    error: "Error al cargar los pedidos",
    errorDescription: "No pudimos obtener los pedidos. Inténtalo de nuevo.",
    empty: "No se encontraron pedidos",
    emptyDescription: "No hay pedidos que coincidan con los filtros aplicados.",
    detailTitle: "PEDIDO",
    products: "Productos",
    shippingData: "Datos de envío",
    recipientData: "Datos del destinatario",
    summary: "Resumen",
    created: "Creado",
    updated: "Actualizado",
    quantityLabel: "Cant:",
    assignManager: "Asignar gestor",
    searchPlaceholder: "Buscar por N° de pedido, DNI o nombre del cliente...",
    dateRangeLabel: "Rango de fechas",
    clientLabel: "Cliente",
    managerLabel: "Gestor",
    noManager: "Sin asignar",
    managerDialogTitle: "Asignar gestor",
    managerDialogDescription: "Selecciona el gestor que se encargará de este pedido.",
    managerDialogConfirm: "Asignar",
    managerDialogSuccess: "Gestor asignado correctamente",
    managerDialogError: "Error al asignar el gestor",
} as const;

export const ADMIN_ORDER_SORT_OPTIONS = [
    { value: "createdAt,desc", label: "Más reciente" },
    { value: "createdAt,asc", label: "Más antiguo" },
] as const;

// Textos de la página de pedidos del cliente
export const CLIENT_ORDERS = {
    title: "Mis pedidos",
    description: "Consulta el estado y el historial de tus pedidos.",
    loading: "Cargando tus pedidos...",
    error: "Error al cargar los pedidos",
    errorDescription: "No pudimos obtener tus pedidos. Inténtalo de nuevo.",
    empty: "No tienes pedidos aún",
    emptyDescription: "Cuando realices una compra, tus pedidos aparecerán aquí.",
    viewDetail: "Ver detalle",
    detailTitle: "Pedido",
    products: "Productos",
    shippingData: "Datos de envío",
    recipientData: "Datos del destinatario",
    summary: "Resumen",
    created: "Creado",
    updated: "Actualizado",
    quantityLabel: "Cant:",
} as const;