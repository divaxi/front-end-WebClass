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
import { OrderStatusEnum, type Order, type User } from "@/client/api";
import { useAtom, useAtomValue } from "jotai";
import { orderHistoryState, authState } from "@/state";
import { ORDER_STATUS_LABEL } from "@/lib/constant";
import { createOrderHistory } from "@/client/services/order-history-service";
import { toast } from "react-toastify";

interface OrderHistoryItemProps {
  item: {
    id: number | string;
    createdAt: string;
    status: OrderStatusEnum;
    changeByUser: {
      lastName: string;
      firstName: string;
    };
  };
  index: number;
  isLast: boolean;
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  item,
  index,
  isLast,
}) => {
  return (
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
            {ORDER_STATUS_LABEL[item.status as keyof typeof ORDER_STATUS_LABEL]}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {new Date(item.createdAt).toLocaleString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>

          {item.changeByUser && (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              Thay đổi bởi: {item.changeByUser.lastName}{" "}
              {item.changeByUser.firstName}
            </Typography>
          )}
        </Box>
      </Box>
      {!isLast && (
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
  );
};

interface OrderHistoryDialogProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

const OrderHistoryDialog: React.FC<OrderHistoryDialogProps> = ({
  order,
  open,
  onClose,
}) => {
  const auth = useAtomValue(authState);

  const [orderHistory, setOrderHistory] = useAtom(orderHistoryState);

  console.log(orderHistory);

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    createOrderHistory(
      {
        order: order,
        status: selectedStatus as OrderStatusEnum,
        changeByUser: auth?.user as User,
      },
      (res) => {
        setOrderHistory([res, ...orderHistory]);
        toast.success("Cập nhật trạng thái thành công");
      },
      () => {
        toast.error("Cập nhật trạng thái thất bại");
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="order-history-dialog-title"
      aria-describedby="order-history-dialog-description"
      keepMounted={false}
    >
      <DialogTitle
        id="order-history-dialog-title"
        variant="h5"
        sx={{ fontWeight: 600 }}
      >
        Lịch sử đơn hàng
      </DialogTitle>
      <DialogContent
        id="order-history-dialog-description"
        sx={{ maxHeight: "62vh", overflowY: "auto" }}
      >
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ my: 2, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel id="status-select-label">
                  Cập nhật trạng thái
                </InputLabel>
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
                      {
                        ORDER_STATUS_LABEL[
                          status as keyof typeof ORDER_STATUS_LABEL
                        ]
                      }
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
            <OrderHistoryItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === orderHistory.length - 1}
            />
          ))}

          <OrderHistoryItem
            key={"0"}
            item={{
              id: 0,
              createdAt: order.createdAt,
              status: OrderStatusEnum.NEW_PENDING,
              changeByUser: {
                lastName: "Khách",
                firstName: "Hàng",
              },
            }}
            index={0}
            isLast={true}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistoryDialog;
