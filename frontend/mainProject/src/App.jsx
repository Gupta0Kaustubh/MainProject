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
import AdminCalendar from './components/AdminCalendar.jsx';

function App() {

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

  return (
    <>
      {/* Router setup */}
      <Router>
          {/* Routes setup */}
          <Routes>
            {/* Home route */}
          <Route path="/" element={<UserLoginPage onSubmit={handleLogin} setAdminCheck={setAdminCheck } setEmpCheck={setEmpCheck} />} />
            {/* Employee Dashboard route */}
            <Route path="/emp-dashboard" element={<EmployeeDashboard setEmpCheck={setEmpCheck} empCheck={empCheck} />} />
            {/* Employee Profile route */}
            <Route path="/user-profile" element={<UserProfile matchedUserEmail={userEmail} setEmpCheck={setEmpCheck} />} />
            {/* Admin Dashboard route */}
            <Route path="/admin-dashboard" element={<AdminDashboard adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
            {/* Admin Calendar route */}
            <Route path="/admin-calendar" element={<AdminCalendar adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
            {/* User Creation route */}
            <Route path="/user-creation" element={<UserCreationPage onSubmit={handleRegistration} adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
            {/* User Default Password route */}
            <Route path="/user-forgot" element={<UserForgotPassword />} />
            {/* User Default Password route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Trainer Creation route */}
            <Route path="/trainer-creation" element={<TrainerCreationPage adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
            {/* Training Creation route */}
            <Route path="/training-creation" element={<TrainingCreationPage adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
            {/* Quiz Creation route */}
            <Route path="/quiz-creation" element={<QuizCreationPage adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
            {/* Admin Viewing User route */}
            <Route path="/admin-unique-user" element={<AdminUserView adminCheck={adminCheck} setAdminCheck={setAdminCheck} />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
