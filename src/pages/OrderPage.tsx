import { OrderTable } from "@/components/table/order-table";
import { OrderFilterBar } from "@/components/table/order-filter-bar";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { orderState } from "@/state";
import type { OrdersControllerFindAllV1Data } from "@/client/api";
import { useOrders } from "@/client/services/order-service";

export default function OrderPage() {
  const [filters, setFilters] = useState<OrdersControllerFindAllV1Data>({
    customer: undefined,
    status: undefined,
    code: undefined,
    page: 1,
    limit: 10,
  });

  const [orders, setOrders] = useAtom(orderState);

  const { data, mutate } = useOrders({
    customer: filters.customer,
    status: filters.status,
    code: filters.code,
    page: filters.page,
    limit: filters.limit,
  });

  useEffect(() => {
    setOrders(data?.data || []);
  }, [data, setOrders]);

  useEffect(() => {
    mutate();
  }, [filters, mutate]);

  const handleFilterChange =
    (field: keyof typeof filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <Paper sx={{ p: 2 }}>
      <OrderFilterBar filters={filters} onFilterChange={handleFilterChange} />
      <OrderTable orders={orders} />
    </Paper>
  );
}
