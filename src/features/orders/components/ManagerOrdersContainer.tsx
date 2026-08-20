/**
 * Container de gestión de pedidos (panel gestor).
 * Compone filtros, tabla, paginación y diálogos.
 */
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useManagerOrders,
  useManagerOrderDetail,
  useUpdateOrderStatus,
} from "@/features/orders/hooks";
import { ManagerOrderFiltersBar } from "./ManagerOrderFiltersBar";
import { ManagerOrdersTable } from "./ManagerOrdersTable";
import { ManagerOrderDetailDialog } from "./ManagerOrderDetailDialog";
import { StatusUpdateDialog } from "./StatusUpdateDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { MANAGER_ORDERS, DEFAULT_PAGE_SIZE } from "@/features/orders/constants";
import type {
  ManagerOrderSummaryResponse,
  OrderStatus,
} from "@/features/orders/types";

export function ManagerOrdersContainer() {
  const queryClient = useQueryClient();
  const { data, isLoading, filters, updateFilters, setPage, resetFilters } =
    useManagerOrders();

  const updateStatus = useUpdateOrderStatus();

  const [detailOrderId, setDetailOrderId] = useState<number | null>(null);
  const { data: detailData } = useManagerOrderDetail(detailOrderId);
  const [detailOpen, setDetailOpen] = useState(false);

  const [statusUpdateOrder, setStatusUpdateOrder] =
    useState<ManagerOrderSummaryResponse | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);

  const handleViewDetail = (id: number) => {
    setDetailOrderId(id);
    setDetailOpen(true);
  };

  const handleStatusUpdate = (orderId: number, status: OrderStatus) => {
    updateStatus.mutate(
      { orderId, request: { status } },
      {
        onSuccess: () => {
          setStatusOpen(false);
          setStatusUpdateOrder(null);
          queryClient.invalidateQueries({
            queryKey: ["manager-order-detail", orderId],
          });
        },
      },
    );
  };

  const pageSize = filters.size ?? DEFAULT_PAGE_SIZE;
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.number ?? 0;

  const paginationInfo = data
    ? `Mostrando ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, data.totalElements)} de ${data.totalElements} pedidos`
    : undefined;

  return (
    <div className="space-y-4">
      <ManagerOrderFiltersBar
        filters={filters}
        updateFilters={updateFilters}
        onClear={resetFilters}
      />

      <ManagerOrdersTable
        orders={data?.content ?? []}
        isLoading={isLoading}
        onViewDetail={handleViewDetail}
        onUpdateStatus={(order) => {
          setStatusUpdateOrder(order);
          setStatusOpen(true);
        }}
      />

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={currentPage === 0}
        isLast={currentPage >= totalPages - 1}
        onPageChange={setPage}
        info={paginationInfo}
      />

      <ManagerOrderDetailDialog
        order={detailData ?? null}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <StatusUpdateDialog
        order={statusUpdateOrder}
        open={statusOpen}
        onOpenChange={setStatusOpen}
        onConfirm={handleStatusUpdate}
        isUpdating={updateStatus.isPending}
      />
    </div>
  );
}