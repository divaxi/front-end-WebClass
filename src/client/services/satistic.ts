import { SatisticService } from "../api";
import useSWR from "swr";
import type {
  SatisticControllerCountOrderByTimeV1Data,
  SatisticControllerTotalCustomerV1Data,
  SatisticControllerTotalOrderEachStatusV1Data,
  SatisticControllerTotalOrderV1Data,
  SatisticControllerTotalRevenueV1Data,
} from "../api";

const fetchSatisticByTime = async (
  query: SatisticControllerCountOrderByTimeV1Data
) => {
  return await SatisticService.satisticControllerCountOrderByTimeV1(query);
};

export const useSatisticByTime = ({
  startDate,
  endDate,
  enumerateBy,
}: SatisticControllerCountOrderByTimeV1Data) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["satisticByTime", startDate, endDate, enumerateBy],
    () =>
      fetchSatisticByTime({
        startDate,
        endDate,
        enumerateBy,
      })
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const fetchSatisticTotalRevenue = async (
  query: SatisticControllerTotalRevenueV1Data
) => {
  return await SatisticService.satisticControllerTotalRevenueV1(query);
};

export const useSatisticTotalRevenue = (
  query: SatisticControllerTotalRevenueV1Data
) => {
  const { data, error, isLoading, mutate } = useSWR(
    "satisticTotalRevenue",
    () => fetchSatisticTotalRevenue(query)
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const fetchSatisticTotalOrder = async (
  query: SatisticControllerTotalOrderV1Data
) => {
  return await SatisticService.satisticControllerTotalOrderV1(query);
};

export const useSatisticTotalOrder = (
  query: SatisticControllerTotalOrderV1Data
) => {
  const { data, error, isLoading, mutate } = useSWR("satisticTotalOrder", () =>
    fetchSatisticTotalOrder(query)
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const fetchSatisticTotalCustomer = async (
  query: SatisticControllerTotalCustomerV1Data
) => {
  return await SatisticService.satisticControllerTotalCustomerV1(query);
};

export const useSatisticTotalCustomer = (
  query: SatisticControllerTotalCustomerV1Data
) => {
  const { data, error, isLoading, mutate } = useSWR(
    "satisticTotalCustomer",
    () => fetchSatisticTotalCustomer(query)
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const fetchSatisticTotalOrderEachStatus = async (
  query: SatisticControllerTotalOrderEachStatusV1Data
) => {
  return await SatisticService.satisticControllerTotalOrderEachStatusV1(query);
};

export const useSatisticTotalOrderEachStatus = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["satisticTotalOrderEachStatus", startDate, endDate],
    () =>
      fetchSatisticTotalOrderEachStatus({
        startDate,
        endDate,
      }),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      dedupingInterval: 5000,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
