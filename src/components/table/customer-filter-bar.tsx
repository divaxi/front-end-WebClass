import { Box, TextField, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  return (
    <Box sx={{ pb: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Tìm theo tên"
            value={filters.name}
            onChange={onFilterChange("name")}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <TextField
            fullWidth
            label="Tìm theo số điện thoại"
            value={filters.phone}
            onChange={onFilterChange("phone")}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Tìm theo địa chỉ"
            value={filters.address}
            onChange={onFilterChange("address")}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 1 }}>
          <IconButton
            color="primary"
            aria-label="search"
            sx={{ fontSize: 20, scale: 1.2 }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
