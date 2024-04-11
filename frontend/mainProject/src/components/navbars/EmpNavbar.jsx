import React, {useState} from 'react';
import { Link } from 'react-router-dom'

function Navbar({setIsLoggedIn}) {
  
  const [active, setActive] = useState(null);

  function logout() {
    setIsLoggedIn(false)
    localStorage.setItem("role",'')
    localStorage.setItem('isLoggedIn',false)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-tertiary mx-3">
      <div className="container-fluid">
        <Link className='navbar-brand link-opacity-10 fs-1 fw-semibold text-light p-2 mt-1' style={{boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} to='/emp-dashboard' onClick={() => setActive(null)}>TalentEdge Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-3 fw-semibold ${active === 'EmpCalendar' ? 'text-light' : 'text-white-50'}`} to='/emp-calendar' onClick={()=> setActive('EmpCalendar')}>Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-3 fw-semibold ${active === 'Training Prediction' ? 'text-light' : 'text-white-50'}`} to='/prediction-page' onClick={()=> setActive('Training Prediction')}>Training Prediction</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-3 fw-semibold ${active === 'User-Profile' ? 'text-light' : 'text-white-50'}`} to='/user-profile' onClick={()=> setActive('User-Profile')}>User Profile</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link link-opacity-10 text-danger  fs-5 me-4 fw-semibold' to='/' onClick={logout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;