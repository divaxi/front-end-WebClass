import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";

import type {
  Customer,
  LoginResponseDto,
  Order,
  OrderHistory,
} from "./client/api/types.gen";

export const authState = atomWithStorage<LoginResponseDto | null>(
  "authState",
  null
);
export const loadingState = atom<boolean>(false);

export const customerState = atom<Customer[]>([]);
export const orderState = atom<Order[]>([]);

export const orderHistoryState = atom<OrderHistory[]>([]);
