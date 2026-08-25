/**
 * Container principal de la página "Mis pedidos".
 * Filtros por status + lista de cards + paginación + dialog de detalle.
 */
"use client";

import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { AppPagination } from "@/components/shared/AppPagination";
import { ClientOrderCard } from "./ClientOrderCard";
import { OrderDetailDialog } from "./OrderDetailDialog";
import { useClientOrders } from "@/features/orders/hooks";
import {
  CLIENT_ORDERS,
  ORDER_FILTER_OPTIONS,
} from "@/features/orders/constants";
import { cn } from "@/lib/utils";
import type { OrderClientResponse, OrderStatus } from "@/features/orders/types";

export function ClientOrdersList() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    filters,
    setPage,
    setStatus,
  } = useClientOrders();

  const [selectedOrder, setSelectedOrder] =
    useState<OrderClientResponse | null>(null);

  const handleViewDetail = (order: OrderClientResponse) => {
    setSelectedOrder(order);
  };

  return (
    <div className="space-y-6">
      {/* Tabs de filtro por status */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
        role="tablist"
        aria-label="Filtrar por estado"
      >
        {ORDER_FILTER_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            variant={filters.status === opt.value ? "default" : "outline"}
            size="sm"
            role="tab"
            aria-selected={filters.status === opt.value}
            onClick={() => setStatus(opt.value as OrderStatus | "")}
            className={cn(
              "shrink-0 rounded-full text-xs h-9 px-4 transition-all",
              filters.status === opt.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30 hover:bg-primary/90"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {/* Lista */}
      {isLoading ? (
        <LoadingState label={CLIENT_ORDERS.loading} />
      ) : isError ? (
        <ErrorState
          message={CLIENT_ORDERS.error}
          description={CLIENT_ORDERS.errorDescription}
          onRetry={() => refetch()}
        />
      ) : !data || data.content.length === 0 ? (
        <EmptyState
          title={CLIENT_ORDERS.empty}
          description={CLIENT_ORDERS.emptyDescription}
          icon={
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <FaBoxOpen
                size={22}
                className="text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          }
        />
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {data.content.map((order) => (
              <ClientOrderCard
                key={order.id}
                order={order}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>

          <div className="pt-2">
            <AppPagination
              currentPage={data.number}
              totalPages={data.totalPages}
              isFirst={data.first}
              isLast={data.last}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {/* Dialog de detalle */}
      <OrderDetailDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      />
    </div>
  );
}