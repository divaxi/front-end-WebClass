import {
  Box,
  TextField,
  Grid,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "@/providers/dialog-provider";
import { CreateOrderDialog } from "@/components/dialog/create-update-order-dialog";
interface OrderFilterBarProps {
  filters: {
    customerName: string;
    status: string;
    orderCode: string;
  };
  onFilterChange: (
    field: keyof OrderFilterBarProps["filters"]
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OrderFilterBar({
  filters,
  onFilterChange,
}: OrderFilterBarProps) {
  const { openDialog } = useDialog();

  return (
    <Box sx={{ pb: 2 }}>
      <Grid container spacing={2} position="relative">
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Tên khách hàng"
            value={filters.customerName}
            onChange={onFilterChange("customerName")}
            size="medium"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Trạng thái</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={filters.status}
          label="Trạng thái"
          onChange={(e) =>
            onFilterChange("status")(e as React.ChangeEvent<HTMLInputElement>)
          }
          size="medium"
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="pending">Chờ xác nhận</MenuItem>
          <MenuItem value="confirmed">Đã xác nhận</MenuItem>
          <MenuItem value="delivered">Đã giao hàng</MenuItem>
          <MenuItem value="cancelled">Đã hủy</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Mã đơn hàng"
            value={filters.orderCode}
            onChange={onFilterChange("orderCode")}
            size="medium"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 1 }}>
          <IconButton
            color="primary"
            aria-label="search"
            sx={{ fontSize: 20, scale: 1.2 }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid size={{ xs: 6, sm: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              openDialog(
                <CreateOrderDialog
                  onClose={() => {}}
                  onSubmit={() => {}}
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
