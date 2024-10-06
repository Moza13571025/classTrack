// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ToDoList from "./pages/ToDoList";
import MapPage from "./pages/MapPage";
// 設置登入頁面之路由
import LoginPage from "./pages/LoginPage";
import FormPage from "./pages/FormPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/todo">To-Do List</Link>
        <Link to="/map">Map</Link>
        <Link to="/login">Login</Link>
        <Link to="/form">Form</Link>
      </nav>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 受保護的路由：用戶登入後才能訪問 ToDoList 和 MapPage */}
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <ToDoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />

          {/* 登入與表單頁面不需要保護 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
);

export default App;
