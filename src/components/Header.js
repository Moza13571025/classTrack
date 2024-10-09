// src/components/Header.js
import React, { useContext} from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 引入 AuthContext

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, logout } = useContext(AuthContext); // 獲取用戶狀態和登出函數

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100dvw", // Ensure the navbar takes 100% of the viewport width
        // overflowX: "hidden", // Prevent overflow
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: { xs: "0 8px", sm: "0 16px" }, // Use padding for mobile responsiveness
          width: "100dvw",
        }}
      >
        {/* Title - links to home */}
        <Typography
          variant="h6"
          component={Link}
          to="/classTrack"
          sx={{
            textDecoration: "none",
            color: "white",
            fontSize: { xs: "1rem", sm: "1.5rem" },
            marginLeft: "1.5rem",
          }}
          noWrap
        >
          ClassTrack
        </Typography>

        {/* Show desktop nav links */}
        {!isMobile && (
          <Box sx={{ marginRight: "1.5rem" }}>
            <Button color="inherit" component={Link} to="/classTrack">
              首頁
            </Button>
            <Button color="inherit" component={Link} to="/todo">
              備忘錄
            </Button>
            <Button color="inherit" component={Link} to="/map">
              地圖
            </Button>
            {/* 根據用戶狀態顯示登入或登出按鈕 */}
            {user ? (
              <Button color="inherit" onClick={logout}>
                登出
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                登入
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
