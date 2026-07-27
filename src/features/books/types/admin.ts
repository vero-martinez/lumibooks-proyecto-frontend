/**
 * Tipos del panel de administración de libros.
 */

import { BookLanguage, BookFormat } from "./public";

// Datos enviados al backend para crear un libro (campo "data" del FormData)
export interface BookCreateRequest {
    title: string;
    description: string;
    isbn: string;
    price: number;
    stock: number;
    pageCount: number;
    language: BookLanguage;
    format: BookFormat;
    editionYear?: number;
    publisherId: number;
    authorIds: number[];
    categoryIds: number[];
}

// Datos enviados al backend para actualizar un libro (campo "data" del FormData)
export interface BookUpdateRequest {
    title?: string;
    description?: string;
    price?: number;
    stock?: number;
    pageCount?: number;
    language?: BookLanguage;
    format?: BookFormat;
    editionYear?: number;
    publisherId?: number;
    authorIds?: number[];
    categoryIds?: number[];
}

// Respuesta del backend al crear o editar un libro
export interface BookResponse {
    id: number;
    coverImageUrl: string;
    title: string;
    authors: string[];
    description: string;
    price: number;
    isbn: string;
    pageCount: number;
    publisherName: string;
    language: BookLanguage;
    format: BookFormat;
    editionYear?: number;
    categories: string[];
}

// Resumen de libros para la tabla de administración
export interface BookSummary {
    id: number;
    isbn: string;
    title: string;
    authors: string[];
    price: number;
    stock: number;
    isActive: boolean;
    createdAt: string;
}

// Filtros para el endpoint de administración de libros
export interface BookAdminFilters {
    search?: string;
    isActive?: boolean;
    language?: BookLanguage;
    page?: number;
    size?: number;
    sort?: string;
}

// Detalle completo de un libro para el panel de administración
export interface BookAdminDetail {
    id: number;
    coverImageUrl: string;
    title: string;
    authors: string[];
    authorIds: number[];
    description: string;
    price: number;
    isbn: string;
    pageCount: number;
    publisherId: number;
    publisherName: string;
    language: BookLanguage;
    format: BookFormat;
    editionYear?: number;
    categories: string[];
    categoryIds: number[];
    stock: number;
    isActive: boolean;
    averageRating: number;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
}