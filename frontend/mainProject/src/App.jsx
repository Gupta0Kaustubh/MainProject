import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './components/Home.jsx';
import UserLoginPage from './components/UserLoginPage.jsx';
import UserCreationPage from './components/UserCreationPage.jsx';
import UserForgotPassword from './components/UserForgotPassword.jsx';

function App() {

  const handleLogin = (formData) => {
    // Handle the formData here, such as sending it to the server
    console.log('Form data received in App:', formData);
  };
  const handleRegistration = (userData) => {
    // Handle the formData here, such as sending it to the server
    console.log('User data received in App:', userData);
  };

  return (
    <>
      {/* Router setup */}
      <Router>
          {/* Routes setup */}
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />
            {/* User Creation route */}
            <Route path="/user-creation" element={<UserCreationPage onSubmit={handleRegistration} />} />
            {/* User Login route */}
            <Route path="/user-login" element={<UserLoginPage onSubmit={handleLogin} />} />
            {/* User Forget Password route */}
            <Route path="/user-forgot" element={<UserForgotPassword />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
