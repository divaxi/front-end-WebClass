import { OrderStatusEnum } from "@/client/api";

export const ORDER_STATUS_LABEL = {
  [OrderStatusEnum.NEW_PENDING]: "Chờ xác nhận",
  [OrderStatusEnum.CONFIRMED]: "Đã xác nhận",
  [OrderStatusEnum.PACKING]: "Đang đóng gói",
  [OrderStatusEnum.SHIPPED]: "Đã đóng gói",
  [OrderStatusEnum.IN_TRANSIT]: "Đang giao hàng",
  [OrderStatusEnum.DELIVERED]: "Đã giao hàng",
  [OrderStatusEnum.CANCELLED]: "Đã hủy",
  [OrderStatusEnum.RETURN_REQUESTED]: "Đã yêu cầu trả hàng",
  [OrderStatusEnum.RETURNED]: "Đã trả hàng",
  [OrderStatusEnum.FAILED_DELIVERY]: "Giao hàng thất bại",
};

export const placeholerDataForLineChartDayByDay = [
  { label: "Monday", count: 0 },
  { label: "Tuesday", count: 0 },
  { label: "Wednesday", count: 0 },
  { label: "Thursday", count: 0 },
  { label: "Friday", count: 0 },
  { label: "Saturday", count: 0 },
  { label: "Sunday", count: 0 },
];

export const placeholerDataForLineChartMonthByMonth = [
  { label: 1, count: 0 },
  { label: 2, count: 0 },
  { label: 3, count: 0 },
  { label: 4, count: 0 },
  { label: 5, count: 0 },
  { label: 6, count: 0 },
  { label: 7, count: 0 },
  { label: 8, count: 0 },
  { label: 9, count: 0 },
  { label: 10, count: 0 },
  { label: 11, count: 0 },
  { label: 12, count: 0 },
];

export const placeholerDataForLineChartYearByYear = [
  { label: 2020, count: 0 },
  { label: 2021, count: 0 },
  { label: 2022, count: 0 },
  { label: 2023, count: 0 },
  { label: 2024, count: 0 },
  { label: 2025, count: 0 },
];
