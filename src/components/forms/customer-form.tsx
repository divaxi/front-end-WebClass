import React from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextInputController,
  TextAreaInputController,
} from "../forms/input-components";

const customerSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 số"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  note: z.string().nullable().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<CustomerFormData>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      note: initialData?.note || null,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextInputController<CustomerFormData>
          name="name"
          label="Tên khách hàng"
          control={control}
          disabled={isLoading}
          rules={{ required: "Tên không được để trống" }}
        />

        <TextInputController<CustomerFormData>
          name="email"
          label="Email"
          control={control}
          disabled={isLoading}
          rules={{ required: "Email không được để trống" }}
        />

        <TextInputController<CustomerFormData>
          name="phone"
          label="Số điện thoại"
          control={control}
          disabled={isLoading}
          rules={{ required: "Số điện thoại không được để trống" }}
        />

        <TextInputController<CustomerFormData>
          name="address"
          label="Địa chỉ"
          control={control}
          disabled={isLoading}
          rules={{ required: "Địa chỉ không được để trống" }}
        />

        <TextAreaInputController<CustomerFormData>
          name="note"
          label="Ghi chú"
          control={control}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: 600,
            transition: "backgroundColor-color 0.2s",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          {isLoading ? "Đang xử lý..." : initialData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Box>
    </form>
  );
};

export default CustomerForm;
