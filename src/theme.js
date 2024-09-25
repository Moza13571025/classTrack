// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // 主要顏色
    },
    secondary: {
      main: "#f50057", // 次要顏色
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // 全局字體
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    // 你可以根據需求自定義更多字體樣式
  },
  // 你可以在這裡自定義更多主題屬性
});

export default theme;
