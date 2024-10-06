// src/pages/Home.js
import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; 

const Home = () => (
  <div>
    <Typography variant="h4">首頁</Typography>
    <Typography>歡迎來到首頁！</Typography>

    {/* 新增登入和註冊按鈕 */}
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/login"
      style={{ margin: "10px" }} // 調整按鈕之間的間距
    >
      登入
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      component={Link}
      to="/form"
      style={{ margin: "10px" }}
    >
      註冊
    </Button>
  </div>
);

export default Home;
