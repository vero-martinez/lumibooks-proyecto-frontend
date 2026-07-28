"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import NextLink from "next/link";
import { useAuthorDetail, useAuthorBooks } from "@/features/authors/hooks";
import { AuthorInfo } from "@/features/authors/components/AuthorInfo";
import { BookCardGrid } from "@/features/books/components/BookCardGrid";
import { AppPagination } from "@/components/shared/AppPagination";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WiStars } from "react-icons/wi";
import { GiKnockedOutStars } from "react-icons/gi";

export default function AuthorDetailPage() {
  const { id } = useParams<{ id: string; slug: string }>();
  const authorId = Number(id) || 0;
  const [page, setPage] = useState(0);

  const { data: author, isLoading, isError } = useAuthorDetail(authorId);
  const { data: booksData, isLoading: booksLoading } = useAuthorBooks(
    authorId,
    page,
  );

  return (
    <main className="max-w-screen-lg mx-auto w-full p-4 md:p-8 lg:p-16">
      <div className="min-h-[60vh]">
        {isLoading && <LoadingState label="Cargando autor..." />}

        {isError && (
          <ErrorState
            message="Error al cargar el autor"
            description="Ocurrió un problema al obtener los datos del autor. Intenta de nuevo más tarde."
          />
        )}

        {author && (
          <>
            <Breadcrumb className="mb-10">
              <BreadcrumbList className="gap-2">
                <BreadcrumbItem className="uppercase">
                  <BreadcrumbLink asChild>
                    <NextLink href="/authors">Autores</NextLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="uppercase">
                  <BreadcrumbPage>{`${author.firstName} ${author.lastName}`}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <AuthorInfo author={author} />

            {/* Libros del autor */}
            <section>
              <h2 className="text-3xl font-bold text-foreground text-center flex items-center justify-center gap-4 sm:gap-6 lg:gap-12 m-18">
                <WiStars className="text-foreground" size={58} />
                Libros del autor
                <GiKnockedOutStars className="text-foreground" size={58} />
              </h2>

              {booksLoading && <LoadingState label="Cargando libros..." />}

              {!booksLoading && booksData && booksData.content.length > 0 && (
                <>
                  <BookCardGrid books={booksData.content} />
                  <div className="mt-12 flex justify-center">
                    <AppPagination
                      currentPage={page}
                      totalPages={booksData.totalPages}
                      isFirst={booksData.first}
                      isLast={booksData.last}
                      onPageChange={setPage}
                    />
                  </div>
                </>
              )}

              {!booksLoading && booksData && booksData.content.length === 0 && (
                <EmptyState title="Este autor no tiene libros aún." />
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}