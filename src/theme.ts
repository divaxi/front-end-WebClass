// theme.ts
import { createTheme } from "@mui/material/styles";
// @ts-ignore
import type { DataGridProps } from "@mui/x-data-grid/themeAugmentation";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
    status: {
      success: string;
      error: string;
      pending: string;
    };
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
    status?: {
      success: string;
      error: string;
      pending: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(22, 119, 255)",
      light: "rgb(22, 119, 255)",
    },

    background: {
      default: "#F8FAFC", // Background for content
      paper: "#ffffff", // Card / Paper
    },
    text: {
      primary: "#2B2F3C",
      secondary: "#6B7280",
    },
    divider: "#E3E6EF",
    accent: {
      main: "#109CF1",
      light: "#E6F4FF",
    },
    status: {
      success: "#56CA00",
      error: "#FF4C51",
      pending: "#16B1FF",
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "sans-serif"].join(","),
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          fontSize: "60px",
          "&:hover": {
            backgroundColor: "rgba(230,244,255,255)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "#333",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: 0,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          height: "75vh",
          backgroundColor: "white",
          border: "1px solid rgb(216, 216, 226)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-overlay": {
            backgroundColor: "white",
            color: "black",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f7f7f8",
            color: "black",
            fontFamily: "Public Sans",
            fontWeight: 600,
            fontSize: 16,
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "auto",
          },
        },
      },
    },
  },
});

export default theme;
