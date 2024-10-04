//設置首頁、ToDoList、MapPage之路由
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ToDoList from "./pages/ToDoList";
import MapPage from "./pages/MapPage";
//設置登入頁面之路由
import LoginPage from "./pages/LoginPage";
import FormPage from "./pages/FormPage";

//預設
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

const App = () => (
  <Router>
    <nav>
      <Link to="/">To-Do List</Link>
      <Link to="/map">Map</Link>
      <Link to="/login">Login</Link>
      <Link to="/form">Form</Link>
    </nav>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map/:location" element={<MapPage />} /> {/* 路由設置 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
