import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, mt = 0 }) => {
  // 添加 mt 參數，默認值為 0
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile screen

  return (
    <Box sx={{ display: "flex", width: "100dvw", overflowX: "hidden" }}>
      <Header />
      {/* Only show Sidebar on mobile */}
      {isMobile && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          mt: mt, // 使用傳入的 mt 值
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
