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
import type { Order, OrderStatusEnum, User } from "@/client/api";
import { useAtom, useAtomValue } from "jotai";
import { orderHistoryState, authState } from "@/state";
import { ORDER_STATUS_LABEL } from "@/lib/constant";
interface OrderHistoryDialogProps {
  order: Order;
  open: boolean;
  onClose: () => void;
  onUpdateStatus?: (status: string) => void;
}

const OrderHistoryDialog: React.FC<OrderHistoryDialogProps> = ({
  order,
  open,
  onClose,
  onUpdateStatus,
}) => {

  const auth = useAtomValue(authState);

  const [orderHistory, setOrderHistory] = useAtom(orderHistoryState);



  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (selectedStatus ) {
      setSelectedStatus("");
      setOrderHistory([ {
        id: orderHistory[orderHistory.length - 1].id + 1,
        order: orderHistory[orderHistory.length - 1].order,
        status: selectedStatus as OrderStatusEnum,
        createdAt: new Date().toISOString(),
        changeByUser: auth?.user as User,
        updatedAt: new Date().toISOString(),
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
                  {Object.keys(ORDER_STATUS_LABEL).map((status) => (
                    <MenuItem key={status} value={status}>
                      {ORDER_STATUS_LABEL[status as keyof typeof ORDER_STATUS_LABEL]}
                    </MenuItem>
                  ))}
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