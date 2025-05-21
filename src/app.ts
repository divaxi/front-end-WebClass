// React core
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "@/components/app";

// Your stylesheet
import "@/css/styles.css";

// Expose app configuration
// import appConfig from "../app-config.json";

// if (!window.APP_CONFIG) {
//   window.APP_CONFIG = appConfig;
// }

// Mount the app
const root = createRoot(document.getElementById("root")!);

root.render(createElement(App));
