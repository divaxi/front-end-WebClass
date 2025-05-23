import { Box, TextField, Grid, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "@/providers/dialog-provider";
import { CreateCustomerDialog } from "@/components/dialog/create-update-customer-dialog";
import { toast } from "react-toastify";
interface FilterBarProps {
  filters: {
    name: string;
    phone: string;
    address: string;
  };
  onFilterChange: (
    field: "name" | "phone" | "address"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const { openDialog } = useDialog();
  return (
    <Box sx={{ pb: 2 }}>
      <Grid container spacing={2} position="relative">
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Tìm theo tên"
            value={filters.name}
            onChange={onFilterChange("name")}
            size="medium"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Tìm theo số điện thoại"
            value={filters.phone}
            onChange={onFilterChange("phone")}
            size="medium"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Tìm theo địa chỉ"
            value={filters.address}
            onChange={onFilterChange("address")}
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
                <CreateCustomerDialog
                  onClose={() => {}}
                  onSubmit={() => {
                    toast.success("Thêm khách hàng thành công");
                  }}
                  title="Thêm khách hàng"
                />
              )
            }
          >
            <AddIcon sx={{ mr: 1 }} />
            Thêm khách hàng
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
