// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // 如果用戶已登入，顯示頁面；否則，重定向到登入頁面
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
