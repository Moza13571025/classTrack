// src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        我的應用程式
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;