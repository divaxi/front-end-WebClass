import { Box, TextField, Grid, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "@/providers/dialog-provider";
import { CreateCustomerDialog } from "@/components/dialog/create-update-customer-dialog";
import { toast } from "react-toastify";
import { createCustomer } from "@/client/services/customer-service";
import type { CustomerFormData } from "../forms/customer-form";
import type { CustomersControllerFindAllV1Data, Customer } from "@/client/api";
import { useSetAtom } from "jotai";
import { customerState } from "@/state";
interface FilterBarProps {
  filters: CustomersControllerFindAllV1Data;
  onFilterChange: (
    field: "name" | "phone" | "address"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const handleAddCustomer = (
  data: CustomerFormData,
  onSuccess: (res: Customer) => void,
  onError: () => void
) => {
  createCustomer(
    {
      name: data.name,
      phone: data.phone,
      address: data.address,
      note: data.note || undefined,
      email: data.email,
    },
    onSuccess,
    onError
  );
};

export const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const { openDialog } = useDialog();
  const setCustomer = useSetAtom(customerState);
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
        <Grid size={{ xs: 6, sm: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "100%" }}
            onClick={() =>
              openDialog(
                <CreateCustomerDialog
                  onSubmit={(data) => {
                    handleAddCustomer(
                      data,
                      (res) => {
                        toast.success("Thêm khách hàng thành công");
                        setCustomer((prev) => [...prev, res]);
                      },
                      () => {
                        toast.error("Thêm khách hàng thất bại");
                      }
                    );
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
