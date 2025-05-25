import { CustomerTable } from "@/components/table/customer-table";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { FilterBar } from "@/components/table/customer-filter-bar";
import { useAtom } from "jotai";
import { customerState } from "@/state";
import { useCustomers } from "@/client/services/customer-service";
import type { CustomersControllerFindAllV1Data } from "@/client/api";
export default function CustomerPage() {
  const [filters, setFilters] = useState<CustomersControllerFindAllV1Data>({
    name: undefined,
    phone: undefined,
    address: undefined,
    page: 1,
    limit: 10,
  });

  const [customers, setCustomers] = useAtom(customerState);

  const { data, mutate } = useCustomers({
    limit: filters.limit,
    page: filters.page,
    name: filters.name,
    phone: filters.phone,
    address: filters.address,
  });

  useEffect(() => {
    setCustomers(data?.data || []);
  }, [data, setCustomers]);

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
    <>
      <Paper sx={{ p: 2 }}>
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        <CustomerTable customers={customers} />
      </Paper>
    </>
  );
}
