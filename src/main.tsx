import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9a52e0",
    },
    secondary: {
      light: "#e6fcfa",
      main: "#62c9af",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

axios.defaults.baseURL = "http://localhost:3000/";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
