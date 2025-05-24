import { OrderStatusEnum } from "@/client/api";

export const ORDER_STATUS_LABEL = {
  [OrderStatusEnum.NEW_PENDING]: "Chờ xác nhận",
  [OrderStatusEnum.CONFIRMED]: "Đã xác nhận",
  [OrderStatusEnum.PACKING]: "Đang giao hàng",
  [OrderStatusEnum.SHIPPED]: "Đã giao hàng",
  [OrderStatusEnum.IN_TRANSIT]: "Đang giao hàng",
  [OrderStatusEnum.DELIVERED]: "Đã giao hàng",
  [OrderStatusEnum.CANCELLED]: "Đã hủy",
  [OrderStatusEnum.RETURN_REQUESTED]: "Đã yêu cầu trả hàng",
  [OrderStatusEnum.RETURNED]: "Đã trả hàng",
  [OrderStatusEnum.FAILED_DELIVERY]: "Giao hàng thất bại",
};

