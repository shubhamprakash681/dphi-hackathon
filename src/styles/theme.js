import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#53934c",
      light: "#4caf50",
      dark: "#2e7d32",
    },

    secondary: {
      main: "#113245",
      light: "#0d2a3b",
    },
    statusbgn: {
      upcoming: "#fbf1d2",
      active: "#d2e5d4",
      past: "#f8ddd4",
    },

    background: {
      main: "white",
      dark: "#f8f9fd",
      card: "#f8f9fd",
    },
  },
});
