/**
 * Formulario de edición de libros para el panel de administración.
 * Valida con Zod, envía solo campos modificados como multipart/form-data.
 */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcAddImage } from "react-icons/fc";

import { bookUpdateSchema, BookUpdateSchema } from "@/features/books/schemas";
import { useUpdateBook, useCategories, usePublishers } from "@/features/books/hooks";
import { useAuthorsList } from "@/features/authors/hooks";
import { BOOK_LANGUAGES, BOOK_FORMATS } from "@/features/books/constants/catalog.constants";
import type { BookLanguage, BookFormat } from "@/features/books/types";

import { FormField } from "@/components/shared/FormField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { MultiSelectSearch } from "@/components/shared/MultiSelectSearch";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { BookCardPreview } from "@/features/books/components/BookCardPreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuthorPublicResponse } from "@/features/authors/types";
import type { BookAdminDetail } from "@/features/books/types";

function buildUpdatePayload(
  formValues: Omit<BookUpdateSchema, "coverImage">,
  original: BookAdminDetail,
): Partial<BookUpdateSchema> | null {
  const changed: Record<string, unknown> = {};

  if (formValues.title !== original.title) changed.title = formValues.title;
  if (formValues.description !== original.description) changed.description = formValues.description;
  if (formValues.price !== original.price) changed.price = formValues.price;
  if (formValues.stock !== original.stock) changed.stock = formValues.stock;
  if (formValues.pageCount !== original.pageCount) changed.pageCount = formValues.pageCount;
  if (formValues.language !== original.language) changed.language = formValues.language;
  if (formValues.format !== original.format) changed.format = formValues.format;
  if (formValues.editionYear !== original.editionYear) changed.editionYear = formValues.editionYear;
  if (formValues.publisherId !== original.publisherId) changed.publisherId = formValues.publisherId;
  if (JSON.stringify(formValues.authorIds) !== JSON.stringify(original.authorIds)) changed.authorIds = formValues.authorIds;
  if (JSON.stringify(formValues.categoryIds) !== JSON.stringify(original.categoryIds)) changed.categoryIds = formValues.categoryIds;

  return Object.keys(changed).length > 0 ? changed : null;
}

interface EditBookFormProps {
  bookId: number;
}

export function EditBookForm({ bookId }: EditBookFormProps) {
  const { book, isLoading, updateBook, isPending } = useUpdateBook(bookId);

  const [formReady, setFormReady] = useState(false);

  const [authorSearch, setAuthorSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const { data: allAuthors = [] } = useAuthorsList(authorSearch || undefined);
  const { data: allCategories = [] } = useCategories(categorySearch || undefined);
  const { data: publishers = [] } = usePublishers();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookUpdateSchema>({
    resolver: zodResolver(bookUpdateSchema),
    mode: "onSubmit",
    defaultValues: {
      authorIds: [],
      categoryIds: [],
      language: undefined,
      format: undefined,
    },
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        description: book.description,
        price: book.price,
        stock: book.stock,
        pageCount: book.pageCount,
        language: book.language,
        format: book.format,
        editionYear: book.editionYear,
        publisherId: book.publisherId,
        authorIds: book.authorIds ?? [],
        categoryIds: book.categoryIds ?? [],
      });
      setFormReady(true);
    }
  }, [book, reset]);

  const selectedAuthorIds = watch("authorIds");
  const selectedCategoryIds = watch("categoryIds");
  const coverImage = watch("coverImage");
  const title = watch("title");
  const price = watch("price");

  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (coverImage && coverImage instanceof File) {
      const url = URL.createObjectURL(coverImage);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setCoverPreview(null);
  }, [coverImage]);

  const selectedAuthors = allAuthors.filter((a) =>
    (selectedAuthorIds ?? []).includes(a.id),
  );

  const toggleAuthor = (author: AuthorPublicResponse) => {
    const current = selectedAuthorIds ?? [];
    const next = current.includes(author.id)
      ? current.filter((id) => id !== author.id)
      : [...current, author.id];
    setValue("authorIds", next, { shouldValidate: true });
  };

  const toggleCategory = (category: { id: number; name: string }) => {
    const current = selectedCategoryIds ?? [];
    const next = current.includes(category.id)
      ? current.filter((id) => id !== category.id)
      : [...current, category.id];
    setValue("categoryIds", next, { shouldValidate: true });
  };

  const onSubmit = (data: BookUpdateSchema) => {
    if (!book) return;
    const { coverImage: cover, ...formValues } = data;

    const changed = buildUpdatePayload(formValues, book);
    const hasImage = cover instanceof File && cover.name;

    if (!changed && !hasImage) return;

    updateBook({ data: changed ?? {}, coverImage: hasImage ? cover : undefined });
  };

  if (isLoading || !formReady) {
    return <LoadingState />;
  }

  if (!book) {
    return <ErrorState message="No se encontró el libro." />;
  }

  return (
    <div className="mt-8 flex justify-center">
      <Card className="max-w-5xl w-full bg-transparent border-0 shadow-[0_4px_20px_-4px_var(--foreground)]">
        <CardContent className="p-8 md:p-10">
          <form id="edit-book-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

              {/* ── Columna izquierda ── */}
              <div className="flex-1 space-y-8 min-w-0">

                {/* Información básica */}
                <section className="space-y-5">
                  <SectionHeader number={1} title="Información básica" />

                  <FormField label="Título" name="title" error={errors.title} required>
                    <Input
                      id="title"
                      placeholder="Título del libro"
                      aria-invalid={!!errors.title}
                      {...register("title")}
                    />
                  </FormField>

                  <FormField label="Descripción" name="description" error={errors.description} required>
                    <Textarea
                      id="description"
                      rows={4}
                      placeholder="Describe el libro brevemente..."
                      aria-invalid={!!errors.description}
                      {...register("description")}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="ISBN" name="isbn" hint="El ISBN no se puede modificar">
                      <Input
                        id="isbn"
                        value={book.isbn}
                        disabled
                        className="bg-muted/50 cursor-not-allowed"
                      />
                    </FormField>

                    <FormField label="Páginas" name="pageCount" error={errors.pageCount} required>
                      <Input
                        id="pageCount"
                        type="number"
                        min={1}
                        placeholder="Ej: 350"
                        aria-invalid={!!errors.pageCount}
                        {...register("pageCount", { valueAsNumber: true })}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Precio (S/)" name="price" error={errors.price} required>
                      <Input
                        id="price"
                        type="number"
                        step={0.01}
                        min={0.01}
                        placeholder="Ej: 49.90"
                        aria-invalid={!!errors.price}
                        {...register("price", { valueAsNumber: true })}
                      />
                    </FormField>

                    <FormField label="Stock" name="stock" error={errors.stock} required>
                      <Input
                        id="stock"
                        type="number"
                        min={0}
                        placeholder="Ej: 100"
                        aria-invalid={!!errors.stock}
                        {...register("stock", { valueAsNumber: true })}
                      />
                    </FormField>
                  </div>

                  <FormField label="Autores" name="authorIds" error={errors.authorIds as FieldError | undefined} required>
                    <MultiSelectSearch
                      items={allAuthors}
                      selectedIds={selectedAuthorIds ?? []}
                      onToggle={toggleAuthor}
                      onSearch={setAuthorSearch}
                      getItemLabel={(a) => a.fullName}
                      placeholder="Buscar autores..."
                      emptyMessage="No se encontraron autores"
                    />
                  </FormField>

                  <FormField label="Portada" name="coverImage" error={errors.coverImage}>
                    <div className="space-y-2">
                      <label
                        htmlFor="coverImage"
                        className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-input bg-transparent text-sm text-muted-foreground cursor-pointer hover:bg-accent/50 transition-colors"
                      >
                        <FcAddImage size={20} />
                        <span>Cambiar imagen</span>
                      </label>
                      <input
                        id="coverImage"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="sr-only"
                        aria-label="Seleccionar imagen de portada"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setValue("coverImage", file, { shouldValidate: true });
                          }
                        }}
                      />
                      {coverImage && coverImage instanceof File && coverImage.name && (
                        <p className="text-[11px] text-muted-foreground truncate">
                          {coverImage.name}
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground">
                        JPG, PNG o WebP — máx. 5 MB
                      </p>
                    </div>
                  </FormField>
                </section>
              </div>

              {/* ── Columna derecha: detalles + vista previa ── */}
              <div className="w-full lg:flex-1 lg:sticky lg:top-24 space-y-8">

                {/* Detalles */}
                <section className="space-y-5">
                  <SectionHeader number={2} title="Detalles" />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Idioma" name="language" error={errors.language} required>
                      <Select
                        value={watch("language") ?? ""}
                        onValueChange={(val) =>
                          setValue("language", val === "none" ? (undefined as unknown as BookLanguage) : val as BookLanguage, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger
                          id="language"
                          className="w-full data-[size=default]:h-12"
                          aria-invalid={!!errors.language}
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" className="text-muted-foreground">Seleccionar</SelectItem>
                          {BOOK_LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Formato" name="format" error={errors.format} required>
                      <Select
                        value={watch("format") ?? ""}
                        onValueChange={(val) =>
                          setValue(
                            "format",
                            val === "none" ? (undefined as unknown as BookFormat) : val as BookFormat,
                            { shouldValidate: true },
                          )
                        }
                      >
                        <SelectTrigger
                          id="format"
                          className="w-full data-[size=default]:h-12"
                          aria-invalid={!!errors.format}
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" className="text-muted-foreground">Seleccionar</SelectItem>
                          {BOOK_FORMATS.map((fmt) => (
                            <SelectItem key={fmt.value} value={fmt.value}>
                              {fmt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Año edición" name="editionYear" error={errors.editionYear}>
                      <Input
                        id="editionYear"
                        type="number"
                        min={1450}
                        max={2100}
                        placeholder="Opcional"
                        {...register("editionYear", { valueAsNumber: true })}
                      />
                    </FormField>

                    <FormField label="Editorial" name="publisherId" error={errors.publisherId} required>
                      <Select
                        value={watch("publisherId")?.toString() ?? ""}
                        onValueChange={(val) =>
                          setValue("publisherId", val === "none" ? undefined : Number(val), { shouldValidate: true })
                        }
                      >
                        <SelectTrigger
                          id="publisherId"
                          className="w-full data-[size=default]:h-12"
                          aria-invalid={!!errors.publisherId}
                        >
                          <SelectValue placeholder="Seleccionar editorial" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" className="text-muted-foreground">Seleccionar editorial</SelectItem>
                          {publishers.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>

                  <FormField label="Categorías" name="categoryIds" error={errors.categoryIds as FieldError | undefined} required>
                    <MultiSelectSearch
                      items={allCategories}
                      selectedIds={selectedCategoryIds ?? []}
                      onToggle={toggleCategory}
                      onSearch={setCategorySearch}
                      getItemLabel={(c) => c.name}
                      placeholder="Buscar categorías..."
                      emptyMessage="No se encontraron categorías"
                    />
                  </FormField>
                </section>

                {/* Vista previa */}
                <div className="space-y-5">
                  <SectionHeader number={3} title="Vista Previa" />
                  <div className="flex justify-center">
                    <BookCardPreview
                      title={title}
                      authors={selectedAuthors.map((a) => a.fullName)}
                      price={price}
                      coverImageUrl={coverPreview ?? book.coverImageUrl}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* ── Submit ── */}
            <div className="pt-10">
              <LoadingButton
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-semibold"
                loading={isPending}
                loadingText="Guardando cambios..."
              >
                Guardar Cambios
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}