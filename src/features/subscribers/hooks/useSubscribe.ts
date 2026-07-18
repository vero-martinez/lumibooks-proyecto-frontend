/**
 * Hook para suscribirse al newsletter.
 * Utiliza useMutation de @tanstack/react-query para manejar la creación.
 */
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { subscribeService } from "@/features/subscribers/services";

export function useSubscribe() {
  return useMutation({
    mutationFn: subscribeService,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Error al suscribirse al newsletter");
    },
  });
}