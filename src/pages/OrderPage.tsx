import { OrderTable } from "@/components/table/order-table";
import { OrderFilterBar } from "@/components/table/order-filter-bar";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { orderState } from "@/state";
import type { Order } from "@/type";

export default function OrderPage() {
  const [filters, setFilters] = useState({
    customerName: "",
    status: "",
    orderCode: "",
  });

  const [orders, setOrders] = useAtom(orderState);

  useEffect(() => {
    const data = [
      {
        id: 1,
        orderCode: "1234567890",
        customer: {
          id: 1,
          name: "Nguyễn Văn A",
          phone: "0123456789",
          address: "123 Nguyễn Văn A, Hà Nội",
          email: "nguyenvana@gmail.com",
        },
        orderDate: "2024-03-20",
        status: "Đã xác nhận",
        deliveryAddress: "123 Nguyễn Văn A, Hà Nội",
        items: [
          {
            id: 1,
            productName: "Sản phẩm 1",
            quantity: 1,
            unitPrice: 1000000,
          },
        ],
        total: 1000000,
      },
      {
        id: 2,
        orderCode: "1234567891",
        customer: {
          id: 2,
          name: "Trần Thị B",
          phone: "0987654321",
          address: "123 Trần Thị B, Hà Nội",
          email: "tranthib@gmail.com",
        },
        orderDate: "2024-03-19",
        status: "Đang giao",
        deliveryAddress: "123 Trần Thị B, Hà Nội",
        items: [
          {
            id: 2,
            productName: "Sản phẩm 2",
            quantity: 2,
            unitPrice: 1500000,
          },
        ],
        total: 3000000,
      },
      {
        id: 3,
        orderCode: "1234567892",
        customer: {
          id: 3,
          name: "Lê Văn C",
          phone: "0123456789",
          address: "123 Lê Văn C, Hà Nội",
          email: "levanc@gmail.com",
        },
        orderDate: "2024-03-18",
        status: "Hoàn thành",
        deliveryAddress: "123 Lê Văn C, Hà Nội",
        items: [
          {
            id: 3,
            productName: "Sản phẩm 3",
            quantity: 3,
            unitPrice: 2000000,
          },
        ],
        total: 6000000,
      },
    ];

    setOrders(data as Order[]);
  }, [setOrders]);

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
