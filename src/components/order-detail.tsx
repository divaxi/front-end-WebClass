import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import type { Order } from "@/type";
import OrderHistoryDialog from "./dialog/order-history-dialog";
interface OrderDetailProps {
  order: Order;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <OrderHistoryDialog open={openHistoryDialog} onClose={() => setOpenHistoryDialog(false)} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Thông tin đơn hàng
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1">
            <strong>Mã đơn hàng:</strong> {order.orderCode}
          </Typography>
          <Typography variant="body1">
            <strong>Ngày đặt:</strong> {order.orderDate}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Typography variant="body1">
              <strong>Trạng thái:</strong> {order.status}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenHistoryDialog(true);
              }}
            >
              <Typography variant="body1">Lịch sử đơn hàng</Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Thông tin khách hàng
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1">
            <strong>Tên khách hàng:</strong> {order.customer.name}
          </Typography>
          <Typography variant="body1">
            <strong>Số điện thoại:</strong> {order.customer.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {order.customer.email}
          </Typography>
          <Typography variant="body1">
            <strong>Địa chỉ:</strong> {order.customer.address}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Danh sách sản phẩm
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {order.items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1">
                  <strong>Sản phẩm:</strong> {item.productName}
                </Typography>
              </Box>
              <Box sx={{ width: "150px" }}>
                <Typography variant="body1">
                  <strong>Số lượng:</strong> {item.quantity}
                </Typography>
              </Box>
              <Box sx={{ width: "200px" }}>
                <Typography variant="body1">
                  <strong>Đơn giá:</strong>{" "}
                  {item.unitPrice.toLocaleString("vi-VN")}đ
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Tổng tiền
        </Typography>
        <Typography variant="h5" sx={{ color: "#3b82f6", fontWeight: 600 }}>
          {order.total.toLocaleString("vi-VN")}đ
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderDetail;
