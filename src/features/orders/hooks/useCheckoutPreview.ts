/**
 * Hook de TanStack Query para obtener la vista previa del checkout.
 * Se actualiza automáticamente cuando el usuario selecciona una dirección.
 */
import { useQuery } from "@tanstack/react-query";
import { getCheckoutPreviewService } from "@/features/orders/services";

export function useCheckoutPreview(addressId: number | null) {
    return useQuery({
        queryKey: ["checkout-preview", addressId],
        queryFn: () => getCheckoutPreviewService(addressId!),
        enabled: !!addressId && addressId > 0,
    });
}