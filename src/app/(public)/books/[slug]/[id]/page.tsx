"use client";

import { LoadingState } from "@/components/shared/LoadingState";
import { useParams } from "next/navigation";
import { useBookDetail } from "@/features/books/hooks";
import { BookCover } from "@/components/shared/BookCover";
import { ErrorState } from "@/components/shared/ErrorState";
import { BookDetailOverview } from "@/features/books/components/BookDetailOverview";
import { AuthorResumeCard } from "@/features/authors/components/AuthorResumeCard";
import { useAuthStore } from "@/stores/auth.store";
import {
  useBookWishlistStatus,
  useWishlists,
  useAddBookToWishlist,
} from "@/features/wishlists/hooks";
import NextLink from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { BookInfoSection } from "@/features/books/components/BookInfoSection";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string; slug: string }>();
  const bookId = Number(id) || 0;

  const isAuthenticated = useAuthStore((s) => !!s.token);

  const { data: book, isLoading, isError } = useBookDetail(bookId);

  const { data: wishlistStatus } = useBookWishlistStatus(bookId);
  const { data: allWishlists } = useWishlists();
  const addBookToWishlist = useAddBookToWishlist();

  const wishlistsContainingBook = wishlistStatus?.wishlists.map((wl) => wl.id) ?? [];
  const isWishlistBusy = addBookToWishlist.isPending;

  const handleAddToWishlist = (wishlistId: number) => {
    addBookToWishlist.mutate({ wishlistId, bookId });
  };

  return (
    <main className="max-w-screen-xl mx-auto w-full p-4 md:p-8 lg:p-16">
      <div className="min-h-[60vh]">
        {isLoading && <LoadingState label="Cargando libro..." />}

        {isError && (
          <ErrorState
            message="Error al cargar el libro"
            description="Ocurrió un problema al obtener los detalles del libro. Intenta de nuevo más tarde."
          />
        )}

        {book && (
          <>
            <Breadcrumb className="mb-10">
              <BreadcrumbList className="gap-2">
                <BreadcrumbItem className="uppercase">
                  <BreadcrumbLink asChild>
                    <NextLink href="/books">Catálogo</NextLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="uppercase">
                  <BreadcrumbPage>{book.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center mb-12">
              <BookCover
                src={book.coverImageUrl}
                alt={book.title}
                priority
                className="w-48 md:w-64 lg:w-[320px] aspect-[2/3] lg:h-[480px] lg:aspect-auto rounded-lg shadow-lg"
              />
              <BookDetailOverview
                book={book}
                isAuthenticated={isAuthenticated}
                wishlists={allWishlists ?? []}
                wishlistsContainingBook={wishlistsContainingBook}
                isWishlistLoading={isWishlistBusy}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>

            <Separator className="my-12 bg-muted" />

            <BookInfoSection bookId={bookId} book={book} />

            <Separator className="my-12 bg-muted" />

            <section className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-foreground">
                Autor{book.authors.length > 1 ? "es" : ""}
              </h2>
              {book.authors.map((author) => (
                <AuthorResumeCard key={author.id} author={author} />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}