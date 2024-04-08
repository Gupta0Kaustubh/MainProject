import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ setAdminCheck }) {
  const [active, setActive] = useState(null);

  return (
    <nav className="navbar navbar-expand-lg bg-tertiary mx-3">
      <div className="container-fluid">
        <Link className='navbar-brand link-opacity-10 fs-1 fw-semibold text-light' to='/admin-dashboard' onClick={() => setActive(null)}>TrainTrack Ltd.</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-2 fw-semibold ${active === 'Calendar' ? 'text-light' : 'text-white-50'}`} to='/admin-calendar' onClick={() => setActive('Calendar')}>Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-2 fw-semibold ${active === 'User' ? 'text-light' : 'text-white-50'}`} to='/user-creation' onClick={() => setActive('User')}>User Creation</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-2 fw-semibold ${active === 'Trainer' ? 'text-light' : 'text-white-50'}`} to='/trainer-creation' onClick={() => setActive('Trainer')}>Trainer Creation</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-2 fw-semibold ${active === 'Training' ? 'text-light' : 'text-white-50'}`} to='/training-creation' onClick={() => setActive('Training')}>Training Creation</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-2 fw-semibold ${active === 'Quiz' ? 'text-light' : 'text-white-50'}`} to='/quiz-creation' onClick={() => setActive('Quiz')}>Quiz Creation</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link link-opacity-10 fs-5 me-2 fw-semibold ${active === 'User-Progress' ? 'text-light' : 'text-white-50'}`} to='/admin-unique-user' onClick={() => setActive('User-Progress')}>User Progress</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link link-opacity-10 text-danger  fs-5 me-2 fw-semibold' to='/' onClick={() => setAdminCheck(false)}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
