// src/pages/Home.js
import React, { useContext } from "react";
import { Typography, Button, Box, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 導入 AuthContext
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout"; // 確保引入 Layout

const Home = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    login("admin");
    navigate("/todo"); // 管理者帳號登入後跳轉到 ToDoList 頁面
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100dvw",
          overflowX: "hidden", // Prevent horizontal scrolling
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(/ClassTrack.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          ClassTrack
        </Typography>

        {/* Subtitle */}
        <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
          從此不再錯過任何一堂團課！
        </Typography>

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{
            backgroundColor: "#FF4081", // Bold contrasting color
            mb: 2,
            padding: "10px 30px",
            fontSize: "18px",
          }}
        >
          登入
        </Button>

        {/* Register Button */}
        <Button
          component={Link}
          to="/register"
          sx={{
            color: "gray",
            textDecoration: "underline",
            mb: 2,
            fontSize: "16px",
          }}
        >
          還不是會員？&gt;&gt;前往註冊
        </Button>

        {/* Admin Quick Login */}
        <Button
          variant="text"
          onClick={handleAdminLogin}
          sx={{
            color: "#b0b0b0",
            fontSize: "14px",
            mt: 1,
          }}
        >
          管理者一鍵登入
        </Button>
      </Box>
    </Layout>
  );
};

export default Home;
