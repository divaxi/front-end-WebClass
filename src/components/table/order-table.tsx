import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, IconButton } from "@mui/material";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import type { Order } from "@/client/api";
import { useAtom } from "jotai";
import { orderState } from "@/state";
import { useDialog } from "@/providers/dialog-provider";
import { toast } from "react-toastify";
import { DeleteOrderDialog } from "@/components/dialog/delete-order-dialog";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ViewOrderDialog } from "@/components/dialog/view-order-dialog";
import { deleteOrder } from "@/client/services/order-service";
import { ORDER_STATUS_LABEL } from "@/lib/constant";
interface OrderTableProps {
  orders: Order[];
  loading?: boolean;
}

const handleDeleteOrder = (
  order: Order,
  onSuccess: () => void,
  onError: () => void
) => {
  deleteOrder(order, onSuccess, onError);
};

export function OrderTable({ orders, loading = false }: OrderTableProps) {
  const [order, setOrder] = useAtom(orderState);
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
      field: "orderCode",
      headerName: "Mã đơn hàng",
      headerClassName: "header-cell",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Tên khách hàng",
      headerClassName: "header-cell",
      resizable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        return params.row.customer?.name;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày đặt",
      headerClassName: "header-cell",
      resizable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        return format(parseISO(params?.value || ""), "dd/MM/yyyy", {
          locale: vi,
        });
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      headerClassName: "header-cell",
      resizable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        return ORDER_STATUS_LABEL[
          params.row?.status as keyof typeof ORDER_STATUS_LABEL
        ];
      },
    },
    {
      field: "totalAmount",
      headerName: "Tổng tiền",
      headerClassName: "header-cell",
      resizable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => {
        return params.row.totalAmount?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
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
                openDialog(<ViewOrderDialog initialData={params.row} />);
              }}
            >
              <VisibilityOutlinedIcon sx={{ color: "primary.main" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                openDialog(
                  <DeleteOrderDialog
                    onSubmit={() => {
                      handleDeleteOrder(
                        params.row,
                        () => {
                          setOrder(
                            order.filter((item) => item.id !== params.row.id)
                          );
                          toast.success("Xóa đơn hàng thành công");
                        },
                        () => {
                          toast.error("Xóa đơn hàng thất bại");
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
      rows={orders}
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
}
