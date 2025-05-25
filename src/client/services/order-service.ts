import useSWR from "swr";
import type {
  CreateOrderDto,
  Order,
  OrdersControllerFindAllV1Data,
} from "../api";
import { OrdersService } from "../api";
const fetchOrders = async (query: OrdersControllerFindAllV1Data) => {
  return await OrdersService.ordersControllerFindAllV1(query);
};

export const useOrders = (query: OrdersControllerFindAllV1Data) => {
  const { data, error, isLoading, mutate } = useSWR("orders", () =>
    fetchOrders(query)
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const createOrder = async (
  order: CreateOrderDto,
  onSuccess: (res: Order) => void,
  onError: () => void
) => {
  try {
    const res = await OrdersService.ordersControllerCreateV1({
      requestBody: order,
      xCustomLang: "vi",
    });
    onSuccess(res);
  } catch (error) {
    onError();
  }
};

export const deleteOrder = async (
  order: Order,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    await OrdersService.ordersControllerRemoveV1({
      id: order.id,
      xCustomLang: "vi",
    });
    onSuccess();
  } catch (error) {
    onError();
  }
};
