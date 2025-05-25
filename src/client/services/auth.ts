import { AuthService, OpenAPI } from "../api";
import type {
  AuthControllerLoginV1Data,
  AuthControllerRefreshV1Data,
  LoginResponseDto,
} from "../api/types.gen";
import requestwithtokens from "./interceptors";

export const loginWithEmail = async (
  payload: AuthControllerLoginV1Data,
  onSuccess: (res: LoginResponseDto) => void,
  onError: () => void
) => {
  try {
    const userRes = await AuthService.authControllerLoginV1({
      requestBody: payload.requestBody,
      xCustomLang: "vi",
    });
    onSuccess(userRes);
    OpenAPI.TOKEN = userRes.token;
    OpenAPI.REFRESH_TOKEN = userRes.refreshToken;
    requestwithtokens();
  } catch {
    onError();
  }
};

export const refreshToken = async () => {
  try {
    const tokenRes = await AuthService.authControllerRefreshV1();
    OpenAPI.TOKEN = tokenRes.token;
    return tokenRes;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (onSuccess: () => void, onError: () => void) => {
  try {
    await AuthService.authControllerLogoutV1();
    onSuccess();
    OpenAPI.TOKEN = undefined;
  } catch (error) {
    onError();
  }
};
