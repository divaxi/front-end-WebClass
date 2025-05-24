import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CustomerForm } from "@/components/forms";
import type { CustomerFormData } from "@/components/forms/customer-form";
import { useDialog } from "@/providers/dialog-provider";
interface CreateCustomerDialogProps {
  onClose?: () => void;
  onSubmit: (customerData: CustomerFormData) => void;
  isLoading?: boolean;
  initialData?: CustomerFormData;
  title: string;
}

export const CreateCustomerDialog: React.FC<CreateCustomerDialogProps> = ({
  onClose,
  onSubmit,
  isLoading = false,
  initialData,
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
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle variant="h5" sx={{ fontWeight: 600 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <CustomerForm
          onSubmit={(data) => {
            onSubmit(data);
            closeDialog();
          }}
          isLoading={isLoading}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
};
