"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { ManagerOrdersContainer } from "@/features/orders/components";
import { MANAGER_ORDERS } from "@/features/orders/constants";

export default function GestorOrdersPage() {
  return (
    <div>
      <PageHeader
        title={MANAGER_ORDERS.title}
        description={MANAGER_ORDERS.description}
      />
      <ManagerOrdersContainer />
    </div>
  );
}