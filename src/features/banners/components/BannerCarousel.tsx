/**
 * Carrusel de banners de la landing page.
 * El fondo degradado y el borde de onda son estáticos.
 * Solo el título, botón e imagen cambian entre slides.
 * Puntos de navegación debajo del borde de onda.
 */
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import NextLink from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { cn } from "@/lib/utils";
import type { BannerSlide } from "@/features/banners/types";

interface BannerCarouselProps {
  slides: BannerSlide[];
}

const GRADIENT = "from-accent via-primary/30 to-accent";

const autoplayPlugin = Autoplay({ delay: 9000, stopOnInteraction: true });

export function BannerCarousel({ slides }: BannerCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const handleSetApi = useCallback(
    (api: CarouselApi) => {
      setApi(api);
      api?.on("select", onSelect);
    },
    [onSelect],
  );

  return (
    <section aria-label="Banner">
      <div className="relative overflow-hidden group">
        <div className={`bg-gradient-to-r ${GRADIENT}`}>
          <Carousel
            plugins={[autoplayPlugin]}
            opts={{ loop: true }}
            setApi={handleSetApi}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-32 pt-3 pb-6 md:pt-3 md:pb-6 lg:pt-12 lg:pb-16 flex flex-row items-center justify-center gap-2 md:gap-4 lg:gap-10">
                    <div className="lg:flex-1 text-left z-10">
                      <h2 className="text-base md:text-xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3 lg:mb-6 drop-shadow-md max-w-[220px] lg:max-w-lg -mt-1 md:-mt-2 lg:-mt-6">
                        {slide.title}
                      </h2>
                      <Button asChild size="sm" className="rounded-full px-4 md:px-5 lg:px-10 py-0 md:py-2 lg:py-6 text-[10px] md:text-xs lg:text-lg">
                        <NextLink href={slide.buttonUrl}>
                          {slide.buttonText}
                        </NextLink>
                      </Button>
                    </div>

                    <div className="relative w-20 h-28 md:w-40 md:h-52 lg:w-[360px] lg:h-[420px] shrink-0">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-contain object-bottom drop-shadow-[0_30px_60px_#c43670bb] scale-[0.85]"
                        sizes="(max-width: 768px) 80px, (max-width: 1024px) 160px, 420px"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              type="button"
              aria-label="Slide anterior"
              onClick={() => api?.scrollPrev()}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-foreground hover:text-foreground/80"
            >
              <HiArrowCircleLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>
            <button
              type="button"
              aria-label="Slide siguiente"
              onClick={() => api?.scrollNext()}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-foreground hover:text-foreground/80"
            >
              <HiArrowCircleRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>
          </Carousel>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full min-h-6"
          viewBox="0 -10 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90 L0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 90 Z"
            className="fill-background"
          />
          <path
            d="M0 35 Q360 -5 720 35 Q1080 75 1440 35"
            className="stroke-accent"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M0 40 Q360 0 720 40 Q1080 80 1440 40"
            className="stroke-foreground/60"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M0 43 Q360 3 720 43 Q1080 83 1440 43"
            className="stroke-accent"
            strokeWidth="5"
            fill="none"
          />
        </svg>
      </div>

      <div className="flex justify-center gap-3 py-2 relative z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-4 h-4 rounded-full transition-colors",
              index === selectedIndex
                ? "bg-foreground"
                : "bg-foreground/30 hover:bg-foreground/50",
            )}
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}