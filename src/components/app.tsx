import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";
import { DialogProvider } from "@/providers/dialog-provider";

const MyApp = () => {
  // const { accessToken } = useAtomValue(authState);
  // OpenAPI.TOKEN = accessToken;
  // localStorage.setItem(templateStorage, app.template);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DialogProvider>
          <RouterProvider router={router} />
        </DialogProvider>
      </ThemeProvider>
    </div>
  );
};
export default MyApp;
