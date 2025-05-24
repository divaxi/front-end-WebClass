import type { OrderHistory } from "../api";
import type { CreateOrderHistoryDto } from "../api";
import useSWR from "swr";
import { OrderhistoriesService } from "../api";
import type { OrderHistoriesControllerFindAllV1Data } from "../api";

export const fetchOrderHistories = async (query: OrderHistoriesControllerFindAllV1Data) => {
    return await OrderhistoriesService.orderHistoriesControllerFindAllV1(query);
}

export const useOrderHistories = (query: OrderHistoriesControllerFindAllV1Data) => {
    const {data, error, isLoading, mutate} = useSWR("orderHistories", () => fetchOrderHistories(query));
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export const createOrderHistory = async (orderHistory: CreateOrderHistoryDto, onSuccess: (res:OrderHistory) => void, onError: () => void) => {
    try {
        const res = await OrderhistoriesService.orderHistoriesControllerCreateV1({
            requestBody: orderHistory,
            xCustomLang: "vi",
        });
        onSuccess(res);
    } catch (error) {
        onError();
    }
}

