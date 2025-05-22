import React from "react";
import { RouterProvider } from "react-router-dom";
// import { useAtomValue } from "jotai";
import { router } from "@/router";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";

const MyApp = () => {
  // const { accessToken } = useAtomValue(authState);
  // OpenAPI.TOKEN = accessToken;
  // localStorage.setItem(templateStorage, app.template);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};
export default MyApp;
