import React from 'react';
import { Link } from 'react-router-dom'
import birdImage from '../assets/bird.jpg'; // Import the image

function Navbar() {
  return (
    <nav className="navbar bg-tertiary">
      <div className="container-fluid">
        <h1 className='text-light'>TrainTrack </h1>
        <form className="d-flex" role="search">
          <Link className='link-opacity-10' to='/user-creation'><h4 className="text-primary me-5 mb-0" style={{ cursor: 'pointer' }}>User Creation</h4></Link>
          <Link className='link-opacity-10' to='/trainer-creation'><h4 className="text-primary me-5 mb-0" style={{ cursor: 'pointer' }}>Trainer Creation</h4></Link>
          <Link className='link-opacity-10' to='/training-creation'><h4 className="text-primary me-5 mb-0" style={{ cursor: 'pointer' }}>Training Creation</h4></Link>
          <Link className='link-opacity-10' to='/quiz-creation'><h4 className="text-primary me-5 mb-0" style={{ cursor: 'pointer' }}>Quiz Creation</h4></Link>
          <Link className='link-opacity-10' to='/admin-login'><h4 className="text-danger me-5 mb-0" style={{ cursor: 'pointer' }}>Logout</h4></Link>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
