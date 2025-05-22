import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";

import type { Customer } from "./type";

export const authState = atomWithStorage("authState", {
  isStaff: false,
  isLogin: false,
  accessToken: "",
});
export const loadingState = atom<boolean>(false);

export const customerState = atom<Customer[]>([]);
