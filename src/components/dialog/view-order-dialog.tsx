import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import OrderDetail from "@/components/order-detail";
import { useDialog } from "@/providers/dialog-provider";
import type { Order } from "@/type";

interface ViewOrderDialogProps {
  isLoading?: boolean;
  initialData: Order;
}

export const ViewOrderDialog: React.FC<ViewOrderDialogProps> = ({
  initialData,
}) => {
  const { closeDialog, isDialogOpen } = useDialog();
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        closeDialog();
      }}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle variant="h5" sx={{ fontWeight: 600 }}>
        Chi tiết đơn hàng
      </DialogTitle>
      <DialogContent>
        <OrderDetail order={initialData} />
      </DialogContent>
    </Dialog>
  );
};
