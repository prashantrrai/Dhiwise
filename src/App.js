// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage/registerpage';
import UsersPage from './Pages/UsersPage/userpage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/" element={
              <div>
                <h1>Welcome to the Todo App</h1>
                <p>Please navigate to <strong>/register</strong> to add a user or <strong>/users</strong> to view users.</p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
