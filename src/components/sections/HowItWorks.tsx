/**
 * Sección "Cómo funciona" de la landing page.
 * Muestra 4 pasos estáticos para comprar un libro.
 */
import { FaSearch, FaBookOpen, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { GiKnockedOutStars } from "react-icons/gi";
import { WiStars } from "react-icons/wi";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  {
    icon: FaSearch,
    title: "Busca",
    description: "Encuentra el libro que buscas por título, autor o ISBN.",
  },
  {
    icon: FaBookOpen,
    title: "Elige",
    description: "Explora el catálogo y descubre nuevas lecturas.",
  },
  {
    icon: FaShoppingCart,
    title: "Agrega",
    description: "Añade tus favoritos al carrito de compras.",
  },
  {
    icon: FaCheckCircle,
    title: "Compra",
    description: "Completa tu pedido y recíbelo en tu puerta.",
  },
];

export function HowItWorks() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-16 space-y-10">
      <h2 className="text-3xl font-bold text-foreground text-center flex items-center justify-center gap-4 sm:gap-6 lg:gap-12">
        <WiStars className="text-accent" size={58} />
        ¿Cómo funciona?
        <GiKnockedOutStars className="text-accent" size={58} />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step) => (
          <Card key={step.title} className="bg-popover shadow-lg border-0">
            <CardContent className="flex flex-col gap-4 px-6 py-2">
              <div className="flex items-center justify-center size-16 rounded-full bg-foreground/80 shrink-0">
                <step.icon size={28} className="text-accent" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}