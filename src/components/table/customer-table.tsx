import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Button, IconButton, Paper } from "@mui/material";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: "name",
    headerName: "Tên khách hàng",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    flex: 1,
    valueFormatter: (params: { value: string }) => {
      try {
        return format(parseISO(params.value), "dd/MM/yyyy", { locale: vi });
      } catch (error) {
        return params.value;
      }
    },
  },
  {
    field: "actions",
    headerName: "Hành động",
    headerClassName: "header-cell",
    resizable: false,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton>
            <EditOutlinedIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton>
            <DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>
      );
    },
  },
];

export const CustomerTable = ({
  customers,
  loading = false,
}: CustomerTableProps) => {
  return (
    <DataGrid
      scrollbarSize={1}
      rows={customers}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      pageSizeOptions={[10, 20, 50, 100]}
      loading={loading}
      localeText={{
        noRowsLabel: "Không có dữ liệu",
      }}
      sx={{
        overflowX: "auto",
        "& .header-cell": {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
          "&:last-child": {
            borderRight: "none",
          },
        },
      }}
    />
  );
};
