import { SatisticService } from "../api";
import useSWR from "swr";
import type { SatisticControllerCountOrderByTimeV1Data, SatisticControllerTotalOrderV1Data, SatisticControllerTotalRevenueV1Data } from "../api";

const fetchSatisticByTime = async (query: SatisticControllerCountOrderByTimeV1Data) => {
    return await SatisticService.satisticControllerCountOrderByTimeV1(query);
}

export const useSatisticByTime = (query: SatisticControllerCountOrderByTimeV1Data) => {
    const {data, error, isLoading, mutate} = useSWR("satisticByTime", () => fetchSatisticByTime(query));
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export const fetchSatisticTotalRevenue = async (query: SatisticControllerTotalRevenueV1Data) => {
    return await SatisticService.satisticControllerTotalRevenueV1(query);
}

export const useSatisticTotalRevenue = (query: SatisticControllerTotalRevenueV1Data) => {
    const {data, error, isLoading, mutate} = useSWR("satisticTotalRevenue", () => fetchSatisticTotalRevenue(query));
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export const fetchSatisticTotalOrder = async (query: SatisticControllerTotalOrderV1Data) => {
    return await SatisticService.satisticControllerTotalOrderV1(query);
}

export const useSatisticTotalOrder = (query: SatisticControllerTotalOrderV1Data) => {
    const {data, error, isLoading, mutate} = useSWR("satisticTotalOrder", () => fetchSatisticTotalOrder(query));
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

