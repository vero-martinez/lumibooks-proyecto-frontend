/**
 * Sección de suscripción al newsletter en la landing page.
 * Formulario con input de email y botón de suscripción.
 */
"use client";

import { useState } from "react";
import type React from "react";
import { useSubscribe } from "@/features/subscribers/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";
import { GiLoveLetter } from "react-icons/gi";
import { FaPaperPlane } from "react-icons/fa";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe.mutate(
      { email },
      { onSuccess: () => setEmail("") },
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-accent via-accent/80 to-primary/10 px-8 md:px-12 py-12 md:py-16">
      <div className="relative z-10 flex flex-col items-center text-center space-y-5">
        <div className="flex items-center justify-center">
          <GiLoveLetter size={96} className="text-foreground" aria-hidden="true" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Suscríbete a nuestro newsletter
        </h2>

        <p className="text-muted-foreground max-w-md">
          Recibe las últimas novedades, ofertas y recomendaciones de libros directamente en tu correo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full max-w-lg mx-auto rounded-full bg-background overflow-hidden border border-input ring-ring/40 transition-shadow duration-200 focus-within:border-ring focus-within:ring-4"
          aria-label="Suscribirme al newsletter"
        >
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-11 md:h-12 pl-5 placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            disabled={subscribe.isPending}
            className="px-5 md:px-6 h-11 md:h-12 rounded-none bg-foreground text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 border-0"
          >
            {subscribe.isPending ? (
              <ImSpinner2 className="animate-spin" size={18} />
            ) : (
              <>
                <FaPaperPlane size={14} className="mr-2" />
                Suscribirme
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}