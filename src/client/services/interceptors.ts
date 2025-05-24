import { OpenAPI } from "../api";
import { refreshToken } from "./auth";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
}

const checkRefreshToken = (_request: RequestInit) => {
    const token = OpenAPI.TOKEN;
    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token as string);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            refreshToken();
        }
    }   
};

const requestwithtokens = () => {
  OpenAPI.interceptors.request.use((request) => {
    checkRefreshToken(request)
    return request;
  });
};

export default requestwithtokens;    