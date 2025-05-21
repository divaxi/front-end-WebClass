import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";

export const authState = atomWithStorage("authState", {
  isStaff: false,
  isLogin: false,
  accessToken: "",
});
export const loadingState = atom<boolean>(false);
