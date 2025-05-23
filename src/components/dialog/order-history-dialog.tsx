import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import type { OrderHistory } from "@/type";

interface OrderHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdateStatus?: (status: string) => void;
  orderHistories?: OrderHistory[];
}

const  initialOrderHistory = [
    {
      id: 1,
      order: {
        id: 1,
        customer: {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
          address: "123 Đường ABC, Quận 1, TP.HCM"
        },
        orderDate: "2024-03-20",
        orderCode: "ORD001",
        status: "Đã giao hàng",
        total: 1500000,
        deliveryAddress: "123 Đường ABC, Quận 1, TP.HCM",
        items: []
      },
      status: "Đã giao hàng",
      createdAt: new Date("2024-03-20T15:30:00")
    },
    {
      id: 2,
      order: {
        id: 1,
        customer: {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
          address: "123 Đường ABC, Quận 1, TP.HCM"
        },
        orderDate: "2024-03-20",
        orderCode: "ORD001",
        status: "Đang giao hàng",
        total: 1500000,
        deliveryAddress: "123 Đường ABC, Quận 1, TP.HCM",
        items: []
      },
      status: "Đang giao hàng",
      createdAt: new Date("2024-03-20T14:00:00")
    },
    {
      id: 3,
      order: {
        id: 1,
        customer: {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
          address: "123 Đường ABC, Quận 1, TP.HCM"
        },
        orderDate: "2024-03-20",
        orderCode: "ORD001",
        status: "Đã xác nhận",
        total: 1500000,
        deliveryAddress: "123 Đường ABC, Quận 1, TP.HCM",
        items: []
      },
      status: "Đã xác nhận",
      createdAt: new Date("2024-03-20T13:00:00")
    },
    {
      id: 4,
      order: {
        id: 1,
        customer: {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
          address: "123 Đường ABC, Quận 1, TP.HCM"
        },
        orderDate: "2024-03-20",
        orderCode: "ORD001",
        status: "Chờ xác nhận",
        total: 1500000,
        deliveryAddress: "123 Đường ABC, Quận 1, TP.HCM",
        items: []
      },
      status: "Chờ xác nhận",
      createdAt: new Date("2024-03-20T12:00:00")
    }
  ]

const OrderHistoryDialog: React.FC<OrderHistoryDialogProps> = ({
  open,
  onClose,
  orderHistories,
 
}) => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>(initialOrderHistory);

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (selectedStatus ) {
      setSelectedStatus("");
      setOrderHistory([ {
        id: orderHistory.length + 1,
        order: orderHistory[orderHistory.length - 1].order,
        status: selectedStatus,
        createdAt: new Date(),
      },...orderHistory]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle variant="h5" sx={{ fontWeight: 600 }}>
        Lịch sử đơn hàng
      </DialogTitle>
    <DialogContent sx={{ maxHeight: "62vh", overflowY: "auto" }}>
        <Box sx={{ mb: 3 }} >
          <FormControl sx={{ my: 2, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel id="status-select-label">Cập nhật trạng thái</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus}
                  label="Cập nhật trạng thái"
                  onChange={handleStatusChange}
                  fullWidth
                >
                  <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
                  <MenuItem value="Đã xác nhận">Đã xác nhận</MenuItem>
                  <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
                  <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
                  <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUpdateStatus}
                  disabled={!selectedStatus}
                  sx={{ height: "100%" }}
                >
                  <Typography variant="body1">Cập nhật</Typography>
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orderHistory.map((item, index) => (
            <Box key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: index === 0 ? "#f0f9ff" : "transparent",
                  border: "1px solid",
                  borderColor: index === 0 ? "#3b82f6" : "#e0e0e0",
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: index === 0 ? "#3b82f6" : "#e0e0e0",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: index === 0 ? 600 : 400,
                      color: index === 0 ? "#3b82f6" : "inherit",
                    }}
                  >
                    {item.status}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 0.5 }}
                  >
                    {new Date(item.createdAt).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Box>
              {index < orderHistory.length - 1 && (
                <Box
                  sx={{
                    width: 2,
                    height: 20,
                    bgcolor: "#e0e0e0",
                    mx: "auto",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistoryDialog;