// src/pages/Home.js
import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 導入 AuthContext
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    login("admin");
    navigate("/todo"); // 管理者帳號登入後跳轉到 ToDoList 頁面
  };

  return (
    <div>
      <Typography variant="h4">首頁</Typography>
      <Typography>歡迎來到首頁！</Typography>

      <Button variant="contained" color="primary" component={Link} to="/todo">
        ToDoList
      </Button>

      <Button variant="contained" color="primary" component={Link} to="/map">
        地圖
      </Button>

      <Button variant="contained" onClick={handleAdminLogin}>
        管理者一鍵登入
      </Button>
    </div>
  );
};

export default Home;
