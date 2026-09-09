/**
 * Container de administración de pedidos.
 * Compone filtros, tabla, paginación y diálogos de detalle/asignación.
 */
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAdminOrders,
  useAdminOrderDetail,
  useUpdateOrderManager,
} from "@/features/orders/hooks";
import { AdminOrderFiltersBar } from "./AdminOrderFiltersBar";
import { AdminOrdersTable } from "./AdminOrdersTable";
import { AdminOrderDetailDialog } from "./AdminOrderDetailDialog";
import { AssignManagerDialog } from "./AssignManagerDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { DEFAULT_PAGE_SIZE } from "@/features/orders/constants";
import type { AdminOrderSummaryResponse } from "@/features/orders/types";

export function AdminOrdersContainer() {
  const queryClient = useQueryClient();
  const { data, isLoading, filters, updateFilters, setPage, resetFilters } =
    useAdminOrders();

  const updateManager = useUpdateOrderManager();

  const [detailOrderId, setDetailOrderId] = useState<number | null>(null);
  const { data: detailData } = useAdminOrderDetail(detailOrderId);
  const [detailOpen, setDetailOpen] = useState(false);

  const [assignManagerOrder, setAssignManagerOrder] =
    useState<AdminOrderSummaryResponse | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);

  const handleViewDetail = (id: number) => {
    setDetailOrderId(id);
    setDetailOpen(true);
  };

  const handleOpenAssignFromTable = (order: AdminOrderSummaryResponse) => {
    setAssignManagerOrder(order);
    setAssignOpen(true);
  };

  const handleOpenAssignFromDetail = () => {
    if (!detailData) return;
    setAssignManagerOrder({
      id: detailData.id,
      orderNumber: detailData.orderNumber,
      clientName: detailData.clientName,
      dni: detailData.dni,
      status: detailData.status,
      managerName: detailData.managerName,
      createdAt: detailData.createdAt,
    });
    setDetailOpen(false);
    setAssignOpen(true);
  };

  const handleAssignManager = (orderId: number, managerId: number) => {
    updateManager.mutate(
      { orderId, request: { managerId } },
      {
        onSuccess: () => {
          setAssignOpen(false);
          setAssignManagerOrder(null);
          queryClient.invalidateQueries({
            queryKey: ["admin-order-detail", orderId],
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
      <AdminOrderFiltersBar
        filters={filters}
        updateFilters={updateFilters}
        onClear={resetFilters}
      />

      <AdminOrdersTable
        orders={data?.content ?? []}
        isLoading={isLoading}
        onViewDetail={handleViewDetail}
        onAssignManager={handleOpenAssignFromTable}
      />

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={currentPage === 0}
        isLast={currentPage >= totalPages - 1}
        onPageChange={setPage}
        info={paginationInfo}
      />

      <AdminOrderDetailDialog
        order={detailData ?? null}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAssignManager={handleOpenAssignFromDetail}
      />

      <AssignManagerDialog
        order={assignManagerOrder}
        open={assignOpen}
        onOpenChange={setAssignOpen}
        onConfirm={handleAssignManager}
        isUpdating={updateManager.isPending}
      />
    </div>
  );
}