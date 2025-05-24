import { CustomerTable } from "@/components/table/customer-table";
import { Button, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { FilterBar } from "@/components/table/customer-filter-bar";
import { useAtom } from "jotai";
import { customerState } from "@/state";
import { useCustomers } from "@/client/services/customer-service";
import { toast } from "react-toastify";
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

  const { data, error, mutate } = useCustomers({
    limit: filters.limit,
    page: filters.page,
    name: filters.name,
    phone: filters.phone,
    address: filters.address,
  });

  useEffect(() => {
    if (error) {
      toast.error("Lỗi khi tải dữ liệu khách hàng");
    }
    setCustomers(data?.data || []);
  }, [data,error]);

  useEffect(() => {
    mutate();
  }, [filters]);


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
