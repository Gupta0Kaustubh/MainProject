import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar bg-tertiary mx-4">
      <div className="container-fluid">
      <Link className='link-opacity-10' to='/emp-dashboard'><h1 className='text-light'>TrainTrack </h1></Link>
        <form className="d-flex" role="search">
          <Link className='link-opacity-10' to='/user-profile'><h4 className="text-danger me-5 mb-0" style={{ cursor: 'pointer' }}>User Profile</h4></Link>
          <Link className='link-opacity-10' to='/'><h4 className="text-danger me-5 mb-0" style={{ cursor: 'pointer' }}>Logout</h4></Link>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
