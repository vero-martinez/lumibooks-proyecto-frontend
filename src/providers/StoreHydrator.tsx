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
 * en localStorage de los stores de autenticación y carrito.
 */

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";

export function StoreHydrator() {
    useEffect(() => {
        // Restaurar los datos persistidos del carrito.
        useCartStore.persist.rehydrate();

        // Restaurar los datos persistidos de autenticación.
        useAuthStore.persist.rehydrate();
    }, []);

    return null;
}