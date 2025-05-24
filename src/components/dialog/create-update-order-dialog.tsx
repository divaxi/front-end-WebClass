import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import OrderForm from "@/components/forms/order-form";
import type { OrderFormData } from "@/components/forms/order-form";
import { useDialog } from "@/providers/dialog-provider";

interface CreateOrderDialogProps {
  onClose?: () => void;
  onSubmit: (orderData: OrderFormData) => void;
  isLoading?: boolean;
  initialData?: OrderFormData;
  title: string;
}

export const CreateOrderDialog: React.FC<CreateOrderDialogProps> = ({
  onClose,
  onSubmit,
  isLoading = false,
  title,
}) => {
  const { closeDialog, isDialogOpen } = useDialog();

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        closeDialog();
        onClose?.();
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
        {title}
      </DialogTitle>
      <DialogContent>
        <OrderForm
          onSubmit={(data) => {
            onSubmit(data);
            closeDialog();
          }}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
