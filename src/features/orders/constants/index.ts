/**
 * Textos y valores fijos del módulo de checkout/órdenes.
 * Centralizados para evitar strings hardcodeados en los componentes.
 */

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