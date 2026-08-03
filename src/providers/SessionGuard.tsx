/**
 * Restaura la sesión una sola vez al iniciar la aplicación.
 *
 * El Access Token solo existe en memoria. Si hay un usuario persistido
 * pero no existe un token, intenta restaurar la sesión mediante
 * el Refresh Token almacenado en una cookie httpOnly.
 *
 * Mientras se restaura la sesión, muestra un spinner para evitar
 * que la interfaz se renderice temporalmente como si el usuario
 * no estuviera autenticado.
 *
 * Si la restauración falla, elimina la sesión local y redirige
 * al login cuando el usuario intenta acceder a una ruta protegida.
 */

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { refreshAccessToken } from "@/lib/refresh-session";
import { Spinner } from "@/components/ui/spinner";

/**
 * Rutas que requieren que el usuario haya iniciado sesión.
 */
const PROTECTED_PREFIXES = ["/client", "/gestor", "/admin"];

/**
 * Evita ejecutar la restauración de la sesión más de una vez
 * durante la vida de la aplicación.
 */
let restored = false;

export function SessionGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [restoring, setRestoring] = useState(false);

    useEffect(() => {
        // Si la sesión ya fue restaurada, no vuelve a intentarlo.
        if (restored) return;
        restored = true;

        const { token, user } = useAuthStore.getState();

        // Si ya existe un Access Token o no hay un usuario persistido,
        // no es necesario restaurar la sesión.
        if (token || !user) return;

        // Muestra un spinner mientras se intenta restaurar la sesión.
        // Se ejecuta después del montaje para evitar problemas de hidratación.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRestoring(true);

        // Intenta obtener un nuevo Access Token mediante el Refresh Token.
        refreshAccessToken()
            .catch(() => {
                // Si no es posible restaurar la sesión,
                // elimina los datos locales.
                useAuthStore.getState().logout();

                // Si el usuario intentaba acceder a una ruta protegida,
                // lo redirige al login.
                if (
                    PROTECTED_PREFIXES.some((prefix) =>
                        pathname.startsWith(prefix)
                    )
                ) {
                    router.replace("/login");
                }
            })
            .finally(() => {
                // Oculta el spinner al finalizar la restauración.
                setRestoring(false);
            });
    }, [pathname, router]);

    // Mientras se restaura la sesión, muestra un indicador de carga.
    if (restoring) {
        return (
            <div
                role="status"
                aria-label="Restaurando sesión"
                className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            >
                <Spinner className="size-8 text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}