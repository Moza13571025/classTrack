// src/pages/LoginPage.js

import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation for email and phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      setError("請輸入有效的信箱地址");
      return;
    }
    if (!phoneRegex.test(phone)) {
      setError("請輸入有效的手機號碼 (10位數)");
      return;
    }

    // Save user data in localStorage
    const userData = { username, password, email, phone };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        註冊
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleRegister}>
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
        <TextField
          label="信箱"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="手機"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          註冊
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
