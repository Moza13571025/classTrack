// src/pages/LoginPage.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 導入 AuthContext
import { TextField, Button, Typography, Container } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // 密碼 state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 從 localStorage 獲取已註冊用戶資料
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    // 驗證使用者輸入的帳號密碼
    if (
      storedUser &&
      username === storedUser.username &&
      password === storedUser.password
    ) {
      login(username);
      navigate("/todo"); // 登入成功後導向 ToDoList 頁面
    } else if (username === "admin" && password === "admin") {
      login(username);
      navigate("/admin"); // 管理者登入後導向管理頁面
    } else {
      alert("帳號或密碼錯誤");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        登入
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="帳號"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="密碼"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          登入
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
