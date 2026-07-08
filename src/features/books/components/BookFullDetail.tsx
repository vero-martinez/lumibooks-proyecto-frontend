/**
 * Tabla con los detalles completos de un libro (ISBN, autor, editorial, etc.).
 * Es un Server Component porque solo renderiza datos recibidos por props.
 */
import {
  BOOK_FORMATS,
  BOOK_LANGUAGES,
} from "@/features/books/constants/catalog.constants";
import type { BookDetail } from "@/features/books/types";
import { formatAuthors } from "@/lib/utils";

interface BookFullDetailProps {
  book: BookDetail;
}

export function BookFullDetail({ book }: BookFullDetailProps) {
  const languageLabel =
    BOOK_LANGUAGES.find((l) => l.value === book.language)?.label ??
    book.language;
  const formatLabel =
    BOOK_FORMATS.find((f) => f.value === book.format)?.label ?? book.format;

  const rows = [
    { label: "ISBN", value: book.isbn },
    { label: "Autor", value: formatAuthors(book.authors) },
    { label: "Número de páginas", value: book.pageCount },
    { label: "Editorial", value: book.publisherName },
    { label: "Idioma", value: languageLabel },
    { label: "Año de edición", value: book.editionYear ?? "-" },
    { label: "Formato", value: formatLabel },
    { label: "Categorías", value: book.categories.join(", ") },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <table className="w-full border-collapse" aria-label="Detalles del libro">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-border/20 last:border-0 transition-colors ${
                i % 2 === 0 ? "bg-card" : "bg-transparent"
              }`}
            >
              <th
                scope="row"
                className="py-5 pl-6 pr-3 text-sm text-muted-foreground font-semibold whitespace-nowrap w-auto text-left"
              >
                {row.label}
              </th>
              <td className="py-5 pr-6 text-sm text-secondary-foreground">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}