import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminCalendar from './components/AdminCalendar.jsx';
import PredictionPage from './components/PredictionPage.jsx';
import EmpCalendar from './components/EmpCalendar.jsx';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const [adminCheck, setAdminCheck] = useState(false)
  const [empCheck, setEmpCheck] = useState(false)

  const [userEmail, setUserEmail] = useState([])

  const handleLogin = (formData) => {
    // Handle the formData here, such as sending it to the server
    setUserEmail(formData)
    console.log('Form data received in App:', formData);
  };
  const handleRegistration = (userData) => {
    // Handle the formData here, such as sending it to the server
    console.log('User data received in App:', userData);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('role');
    if (loggedIn === 'true' && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, [isLoggedIn, role])

  return (
    <>
      {/* Router setup */}
      <Router>
          {/* Routes setup */}
          <Routes>
          {/* Login route */}
            <Route path="/" element={<UserLoginPage setIsLoggedIn={setIsLoggedIn} onSubmit={handleLogin} />} />
          {/* User Default Password route */}
            <Route path="/user-forgot" element={<UserForgotPassword />} />
            {/* User Default Password route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
          {isLoggedIn && (
            <>
              {role === 'Employee' && (
                <>
                  {/* Employee Dashboard route */}
                  <Route path="/emp-dashboard" element={<EmployeeDashboard setIsLoggedIn={setIsLoggedIn} />} />
                  {/* Employee Profile route */}
                  <Route path="/user-profile" element={<UserProfile matchedUserEmail={userEmail} setIsLoggedIn={setIsLoggedIn} />} />
                  {/* Employee Calendar route */}
                  <Route path="/emp-calendar" element={<EmpCalendar matchedUserEmail={userEmail} setIsLoggedIn={setIsLoggedIn} />} />
                  {/* Prediction User route */}
                  <Route path="/prediction-page" element={<PredictionPage setIsLoggedIn={setIsLoggedIn} />} />
                </>
              )}
            
            {role === 'Admin' && (
          <>
            {/* User Creation route */}
            <Route path="/user-creation" element={<UserCreationPage onSubmit={handleRegistration} setIsLoggedIn={setIsLoggedIn} />} />
            {/* Admin Dashboard route */}
            <Route path="/admin-dashboard" element={<AdminDashboard setIsLoggedIn={setIsLoggedIn} />} />
            {/* Admin Calendar route */}
                  <Route path="/admin-calendar" element={<AdminCalendar setIsLoggedIn={setIsLoggedIn } />} />
            {/* Trainer Creation route */}
            <Route path="/trainer-creation" element={<TrainerCreationPage setIsLoggedIn={setIsLoggedIn} />} />
            {/* Training Creation route */}
            <Route path="/training-creation" element={<TrainingCreationPage setIsLoggedIn={setIsLoggedIn} />} />
            {/* Quiz Creation route */}
            <Route path="/quiz-creation" element={<QuizCreationPage setIsLoggedIn={setIsLoggedIn} />} />
            {/* Admin Viewing User route */}
                  <Route path="/admin-unique-user" element={<AdminUserView setIsLoggedIn={setIsLoggedIn} />} />
                  </>
            )}
            
          </>
          )}
          </Routes>
      </Router>
    </>
  )
}

export default App
