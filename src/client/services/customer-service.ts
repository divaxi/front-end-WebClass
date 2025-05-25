import {
  CustomersService,
  type CreateCustomerDto,
  type Customer,
  type CustomersControllerFindAllV1Data,
  type UpdateCustomerDto,
} from "../api";
import useSWR from "swr";

export const fetchCustomers = async (
  query: CustomersControllerFindAllV1Data
) => {
  return await CustomersService.customersControllerFindAllV1(query);
};

export const createCustomer = async (
  customer: CreateCustomerDto,
  onSuccess: (res: Customer) => void,
  onError: () => void
) => {
  try {
    const res = await CustomersService.customersControllerCreateV1({
      requestBody: customer,
      xCustomLang: "vi",
    });
    onSuccess(res);
  } catch (error) {
    onError();
  }
};

export const updateCustomer = async (
  id: string,
  customer: UpdateCustomerDto,
  onSuccess: (res: Customer) => void,
  onError: () => void
) => {
  try {
    const res = await CustomersService.customersControllerUpdateV1({
      id: id,
      requestBody: customer,
      xCustomLang: "vi",
    });
    onSuccess(res);
  } catch (error) {
    onError();
  }
};

export const deleteCustomer = async (
  customer: Customer,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    await CustomersService.customersControllerRemoveV1({
      id: customer.id,
      xCustomLang: "vi",
    });
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const useCustomers = (query: CustomersControllerFindAllV1Data) => {
  const { data, error, isLoading, mutate } = useSWR("customers", () =>
    fetchCustomers(query)
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
