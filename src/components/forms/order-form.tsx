import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import type { UseFormSetValue, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextInputController,
  SelectInputController,
} from "../forms/input-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import type { Customer, Order } from "@/client/api";
import { useCustomers } from "@/client/services/customer-service";

const customerOptionsTranform = (customers: Customer[]) =>
  customers?.map((customer) => ({
    value: customer.id,
    displayName: `${customer.name} - ${customer.phone}`,
  }));

const availableProducts = [
  { id: 1, name: "Sản phẩm 1", price: 100000 },
  { id: 2, name: "Sản phẩm 2", price: 200000 },
  { id: 3, name: "Sản phẩm 3", price: 300000 },
];

const productOptions = availableProducts.map((product) => ({
  value: product.name,
  displayName: `${product.name} - ${product.price.toLocaleString("vi-VN")}đ`,
}));

const orderSchema = z.object({
  customer: z.object({
    id: z.string().min(1, "Vui lòng chọn khách hàng"),
  }),
  item: z
    .array(
      z.object({
        productName: z.string().min(1, "Tên sản phẩm không được để trống"),
        quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
        unitPrice: z.number().min(0, "Đơn giá không được âm"),
      })
    )
    .min(1, "Đơn hàng phải có ít nhất một sản phẩm"),
  totalAmount: z.number().min(0, "Tổng tiền không được âm"),
  deliveryAddress: z.string().min(1, "Địa chỉ giao hàng không được để trống"),
});

export type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<Order>;
}

const OrderItemList: React.FC<{
  control: Control<OrderFormData>;
  disabled?: boolean;
  setValue: UseFormSetValue<OrderFormData>;
}> = ({ control, disabled, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  const handleAddProduct = () => {
    append({
      productName: "",
      quantity: 1,
      unitPrice: 0,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Danh sách sản phẩm
      </Typography>

      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            p: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SelectInputController<OrderFormData>
              name={`item.${index}.productName`}
              label="Sản phẩm"
              control={control}
              setValue={setValue}
              options={productOptions}
              disabled={disabled}
              rules={{ required: "Vui lòng chọn sản phẩm" }}
              setSubLocation={(option) => {
                const product = availableProducts.find(
                  (p) => p.name === option.value
                );
                if (product) {
                  setValue(`item.${index}`, {
                    productName: product.name,
                    quantity: 1,
                    unitPrice: product.price,
                  });
                }
              }}
            />
          </Box>

          <Box sx={{ width: "150px" }}>
            <TextInputController<OrderFormData>
              name={`item.${index}.quantity`}
              label="Số lượng"
              type="number"
              control={control}
              disabled={disabled}
              rules={{
                required: "Số lượng không được để trống",
                min: {
                  value: 1,
                  message: "Số lượng phải lớn hơn 0",
                },
              }}
              transform={(value: string) => (value ? Number(value) : undefined)}
            />
          </Box>

          <Box sx={{ width: "200px" }}>
            <TextInputController<OrderFormData>
              name={`item.${index}.unitPrice`}
              label="Đơn giá"
              type="number"
              control={control}
              disabled={disabled}
              rules={{
                required: "Đơn giá không được để trống",
                min: {
                  value: 0,
                  message: "Đơn giá không được âm",
                },
              }}
              transform={(value: string) => (value ? Number(value) : undefined)}
            />
          </Box>

          <IconButton
            onClick={() => remove(index)}
            disabled={disabled}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        startIcon={<AddIcon />}
        onClick={handleAddProduct}
        disabled={disabled}
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Thêm sản phẩm
        </Typography>
      </Button>
    </Box>
  );
};

const OrderForm: React.FC<OrderFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const [searchName, setSearchName] = React.useState("");

  const { data } = useCustomers({
    page: 1,
    limit: 10,
    name: searchName,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: {
        id: initialData?.customer?.id?.toString() || "",
      },
      item: initialData?.item || [],
      totalAmount: initialData?.totalAmount || 0,
      deliveryAddress: initialData?.deliveryAddress || "",
    },
  });

  const items = watch("item");
  const quantities = items.map((item) => item.quantity);
  const unitPrices = items.map((item) => item.unitPrice);



  React.useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    setValue("totalAmount", total);
  }, [items, quantities, unitPrices, setValue]);

  React.useEffect(() => {
    if (errors) {
      toast.error(errors.item?.message);
      toast.error(errors.customer?.message);
      toast.error(errors.deliveryAddress?.message);
      toast.error(errors.totalAmount?.message);
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="the-form">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <SelectInputController<OrderFormData>
          name="customer.id"
          label="Khách hàng"
          control={control}
          setValue={setValue}
          options={customerOptionsTranform(data?.data || [])}
          disabled={isLoading}
          rules={{ required: "Vui lòng chọn khách hàng" }}
          setSubLocation={(option) => {
            setValue("customer", {
              id: option.value.toString(),
            });
          }}
          onInputChange={(value) => setSearchName(value)}
        />

        <OrderItemList
          control={control}
          disabled={isLoading}
          setValue={setValue}
        />

        <TextInputController<OrderFormData>
          name="deliveryAddress"
          label="Địa chỉ giao hàng"
          control={control}
          disabled={isLoading}
          rules={{ required: "Địa chỉ giao hàng không được để trống" }}
        />

        <TextInputController<OrderFormData>
          name="totalAmount"
          label="Tổng tiền"
          type="number"
          control={control}
          disabled={true}
          rules={{ required: "Tổng tiền không được để trống" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            width: "100%",
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

export default OrderForm;
