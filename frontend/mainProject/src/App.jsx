import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './components/Home.jsx';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard'
import AdminDashboard from './components/dashboards/AdminDashboard'
import UserLoginPage from './components/UserLoginPage.jsx';
import UserCreationPage from './components/UserCreationPage.jsx';
import TrainerCreationPage from './components/TrainerCreationPage.jsx';
import UserForgotPassword from './components/UserForgotPassword.jsx';
import TrainingCreationPage from './components/TrainingCreationPage'
import QuizCreationPage from './components/QuizCreationPage.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import AdminUserView from './components/AdminUserView.jsx';
import UserProfile from './components/UserProfile.jsx';

function App() {

  const [userEmail, setUserEmail] = useState([])

  const handleLogin = (formData) => {
    // Handle the formData here, such as sending it to the server
    setUserEmail(formData)
    console.log('Form data received in App:', formData);
    // Make HTTP POST request to execute Python script
    fetch('http://localhost:3001/execute-python-script', {
      method: 'POST',
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error executing Python script:', error);
      });
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
          <Route path="/" element={<UserLoginPage onSubmit={handleLogin} />} />
            {/* Employee Dashboard route */}
            <Route path="/emp-dashboard" element={<EmployeeDashboard />} />
            {/* Employee Profile route */}
            <Route path="/user-profile" element={<UserProfile matchedUserEmail={userEmail} />} />
            {/* Admin Dashboard route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            {/* User Creation route */}
            <Route path="/user-creation" element={<UserCreationPage onSubmit={handleRegistration} />} />
            {/* User Default Password route */}
            <Route path="/user-forgot" element={<UserForgotPassword />} />
            {/* User Default Password route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Trainer Creation route */}
            <Route path="/trainer-creation" element={<TrainerCreationPage />} />
            {/* Training Creation route */}
            <Route path="/training-creation" element={<TrainingCreationPage />} />
            {/* Quiz Creation route */}
            <Route path="/quiz-creation" element={<QuizCreationPage />} />
            {/* Admin Viewing User route */}
            <Route path="/admin-unique-user" element={<AdminUserView />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
