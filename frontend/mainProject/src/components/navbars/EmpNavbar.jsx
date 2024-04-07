import React from 'react';
import { Link } from 'react-router-dom'

function Navbar({setEmpCheck}) {
  return (
    <nav className="navbar navbar-expand-lg bg-tertiary mx-3">
      <div className="container-fluid">
        <Link className='navbar-brand link-opacity-10 fs-1 fw-semibold text-light' to='/emp-dashboard'>TrainTrack Ltd.</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className='nav-link link-opacity-10 fs-5 me-3 fw-semibold text-white-50' to='/user-profile'>User Profile</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link link-opacity-10 text-danger  fs-5 me-4 fw-semibold' to='/' onClick={() => setEmpCheck(false)}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;