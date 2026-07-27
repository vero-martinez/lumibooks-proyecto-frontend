import { PageHeader } from "@/components/shared/PageHeader";
import { BooksAdmin } from "@/features/books/components/BooksAdmin";

export default function AdminBooksPage() {
  return (
    <div>
      <PageHeader title="Gestión de Libros" description="Consulta, crea, edita y administra el catálogo de libros." />
      <BooksAdmin />
    </div>
  );
}