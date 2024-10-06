// src/pages/Home.js
import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 導入 AuthContext

const Home = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <Typography variant="h4">首頁</Typography>
      <Typography>歡迎來到首頁！</Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/todo"
      >
        ToDoList
      </Button>

      <Button variant="contained" color="primary" component={Link} to="/map">
        地圖
      </Button>

      {isLoggedIn ? (
        <Button variant="contained" color="secondary" onClick={logout}>
          登出
        </Button>
      ) : (
        <Button variant="contained" component={Link} to="/login">
          登入
        </Button>
      )}
    </div>
  );
};

export default Home;
