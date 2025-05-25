import {
  Box,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "@/providers/dialog-provider";
import { CreateOrderDialog } from "@/components/dialog/create-update-order-dialog";
import type { OrdersControllerFindAllV1Data, Order } from "@/client/api";
import { ORDER_STATUS_LABEL } from "@/lib/constant";
import type { OrderFormData } from "../forms/order-form";
import { createOrder } from "@/client/services/order-service";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { orderState } from "@/state";
interface OrderFilterBarProps {
  filters: Omit<OrdersControllerFindAllV1Data, "page" | "limit">;
  onFilterChange: (
    field: keyof OrderFilterBarProps["filters"]
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const handleAddOrder = (
  data: OrderFormData,
  onSuccess: (res: Order) => void,
  onError: () => void
) => {
  createOrder(
    {
      customer: data.customer,
      item: data.item,
      totalAmount: data.totalAmount,
      deliveryAddress: data.deliveryAddress,
    },
    onSuccess,
    onError
  );
};

export function OrderFilterBar({
  filters,
  onFilterChange,
}: OrderFilterBarProps) {
  const { openDialog } = useDialog();
  const setOrder = useSetAtom(orderState);

  return (
    <Box sx={{ pb: 2 }}>
      <Grid container spacing={2} position="relative">
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Tên khách hàng"
            value={filters.customer}
            onChange={onFilterChange("customer")}
            size="medium"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Trạng thái
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filters.status}
              label="Trạng thái"
              onChange={(e) =>
                onFilterChange("status")(
                  e as React.ChangeEvent<HTMLInputElement>
                )
              }
              size="medium"
            >
              <MenuItem value="">Tất cả</MenuItem>
              {Object.entries(ORDER_STATUS_LABEL).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Mã đơn hàng"
            value={filters.code}
            onChange={onFilterChange("code")}
            size="medium"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "100%" }}
            onClick={() =>
              openDialog(
                <CreateOrderDialog
                  onSubmit={(data) => {
                    handleAddOrder(
                      data,
                      (res) => {
                        toast.success("Đơn hàng đã được thêm thành công");
                        setOrder((prev) => [...prev, res]);
                      },
                      () => {
                        toast.error("Có lỗi xảy ra khi thêm đơn hàng");
                      }
                    );
                  }}
                  isLoading={false}
                  initialData={undefined}
                  title="Thêm đơn hàng"
                />
              )
            }
          >
            <AddIcon sx={{ mr: 1 }} />
            Thêm đơn hàng
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
