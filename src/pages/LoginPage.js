// src/pages/LoginPage.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 導入 AuthContext
import { TextField, Button, Typography, Container } from "@mui/material";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // 登入後設置 isLoggedIn 為 true
    navigate("/todo"); // 登入成功後導向 ToDoList 頁面
  };

  return (
    <div>
      <h2>登入頁面</h2>
      <button onClick={handleLogin}>登入</button>
    </div>
  );
};

export default LoginPage;
