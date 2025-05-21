import React from "react";
import { RouterProvider } from "react-router-dom";

// import { useAtomValue } from "jotai";
import { router } from "@/router";

const MyApp = () => {
  // const { accessToken } = useAtomValue(authState);
  // OpenAPI.TOKEN = accessToken;
  // localStorage.setItem(templateStorage, app.template);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default MyApp;
