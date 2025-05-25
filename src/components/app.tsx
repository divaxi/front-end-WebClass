import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";
import { DialogProvider } from "@/providers/dialog-provider";
import { Bounce, ToastContainer } from "react-toastify";
import { useAtom } from "jotai";
import { authState } from "@/state";
import requestwithtokens from "@/client/services/interceptors";
import { OpenAPI } from "@/client/api";
import { SWRConfig } from "swr";
import { optionsSWR } from "@/lib/utils";

const MyApp = () => {
  const [auth, setAuth] = useAtom(authState);

  useEffect(() => {
    if (auth) {
      OpenAPI.TOKEN = auth.token;
      OpenAPI.REFRESH_TOKEN = auth.refreshToken;
      requestwithtokens(setAuth);
    }
  }, [auth]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={optionsSWR}>
          <DialogProvider>
            <RouterProvider router={router} />
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              draggable
              theme="light"
              transition={Bounce}
            />
          </DialogProvider>
        </SWRConfig>
      </ThemeProvider>
    </div>
  );
};
export default MyApp;
