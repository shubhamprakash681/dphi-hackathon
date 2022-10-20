import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./styles/theme";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
