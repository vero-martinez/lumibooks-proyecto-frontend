"use client";

/**
 * Componente encargado de rehidratar los stores persistidos en el cliente.
 *
 * Los stores utilizan `skipHydration: true` para evitar que Zustand
 * intente restaurar los datos de localStorage durante el SSR.
 * Esto permite que el HTML generado por el servidor y el primer
 * renderizado del cliente sean iguales, evitando errores de hidratación.
 *
 * Una vez que el componente se monta en el cliente, se ejecuta
 * manualmente la rehidratación para restaurar los datos guardados
 * en localStorage del store de carrito.
 */

import { useEffect } from "react";
import { useCartStore } from "@/stores/cart.store";

export function StoreHydrator() {
    useEffect(() => {
        // Restaurar los datos persistidos del carrito.
        useCartStore.persist.rehydrate();
    }, []);

    return null;
}