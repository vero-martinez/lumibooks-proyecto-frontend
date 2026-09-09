"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { AdminOrdersContainer } from "@/features/orders/components";
import { ADMIN_ORDERS } from "@/features/orders/constants";

export default function AdminOrdersPage() {
  return (
    <div>
      <PageHeader
        title={ADMIN_ORDERS.title}
        description={ADMIN_ORDERS.description}
      />
      <AdminOrdersContainer />
    </div>
  );
}