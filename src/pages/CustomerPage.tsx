import { CustomerTable } from "@/components/table/customer-table";
import { Paper } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { FilterBar } from "@/components/table/customer-filter-bar";
import { useAtom, useAtomValue } from "jotai";
import { customerState } from "@/state";
export default function CustomerPage() {
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 3,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 4,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 5,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 6,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 7,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 8,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 9,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 10,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 11,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 12,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 13,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 14,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
    {
      id: 15,
      name: "Jim Beam",
      email: "jim.beam@example.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      createdAt: "2021-01-01",
    },
  ];

  const [customers, setCustomers] = useAtom(customerState);

  useEffect(() => {
    setCustomers(data);
  }, []);
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
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <CustomerTable customers={customers} />
    </Paper>
  );
}
