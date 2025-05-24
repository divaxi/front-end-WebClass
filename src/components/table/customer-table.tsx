import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, IconButton } from "@mui/material";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { useAtom } from "jotai";
import { customerState } from "@/state";
import { useDialog } from "@/providers/dialog-provider";
import { CreateCustomerDialog } from "@/components/dialog/create-update-customer-dialog";
import { DeleteCustomerDialog } from "@/components/dialog/delete-customer-dialog";
import { toast } from "react-toastify";
import {
  updateCustomer,
  deleteCustomer,
} from "@/client/services/customer-service";
import type { Customer, UpdateCustomerDto } from "@/client/api";
interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
}

const handleUpdateCustomer = (
  id: string,
  customerData: UpdateCustomerDto,
  onSuccess: () => void,
  onError: () => void
) => {
  updateCustomer(id, customerData, onSuccess, onError);
};

const handleDeleteCustomer = (
  customer: Customer,
  onSuccess: () => void,
  onError: () => void
) => {
  deleteCustomer(customer, onSuccess, onError);
};

export const CustomerTable = ({
  customers,
  loading = false,
}: CustomerTableProps) => {
  const [customer, setCustomer] = useAtom(customerState);
  const { openDialog } = useDialog();
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
        } catch {
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
            <IconButton
              onClick={() => {
                openDialog(
                  <CreateCustomerDialog
                    onClose={() => {}}
                    onSubmit={(customerData) => {
                      handleUpdateCustomer(
                        params.row.id,
                        customerData as UpdateCustomerDto,
                        () => {
                          setCustomer(
                            customer.map((item) =>
                              item.id === params.row.id
                                ? { ...item, ...customerData }
                                : item
                            )
                          );
                          toast.success("Cập nhật khách hàng thành công");
                        },
                        () => {
                          toast.error("Cập nhật khách hàng thất bại");
                        }
                      );
                    }}
                    title="Cập nhật khách hàng"
                    initialData={params.row}
                  />
                );
              }}
            >
              <EditOutlinedIcon sx={{ color: "primary.main" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                openDialog(
                  <DeleteCustomerDialog
                    onSubmit={() => {
                      handleDeleteCustomer(
                        params.row,
                        () => {
                          setCustomer(
                            customer.filter((item) => item.id !== params.row.id)
                          );
                          toast.success("Xóa khách hàng thành công");
                        },
                        () => {
                          toast.error("Xóa khách hàng thất bại");
                        }
                      );
                    }}
                  />
                );
              }}
            >
              <DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];
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
