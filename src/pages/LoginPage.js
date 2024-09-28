// src/pages/LoginPage.js

import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hardcodedCredentials = {
    username: "admin",
    password: "password123",
  };

  const handleLogin = () => {
    if (
      username === hardcodedCredentials.username &&
      password === hardcodedCredentials.password
    ) {
      // 登入成功的處理
      alert("Login successful!");
      // 可以進一步導航到主頁或其他頁面
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
