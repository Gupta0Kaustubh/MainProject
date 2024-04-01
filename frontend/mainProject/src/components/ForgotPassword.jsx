import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import ForgotPassword from '../assets/login_back.jpg'

function UserForgotPassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    const dPassword = generateRandomPassword();
    const updatedFormData = { ...formData, password: dPassword }; 
    axios.post('http://localhost:3001/forgotPassword', updatedFormData)
      .then(response => {
        console.log('Default Password sent to the mail successfully:', response.data);
        toast.success('Default Password sent to the mail successfully');
        setTimeout(() => {
          navigate('/')
        }, 6000);
      })
      .catch(error => {
        console.error('Error sending the mail:', error);
        toast.error('Failed to send mail. Please try again.');
      });
  };


  return (
    <MDBContainer className='my-5'>
      <nav className="navbar bg-tertiary mb-3 ms-3">
      <div className="container-fluid">
        <h1 className='text-light'>TrainTrack </h1>
      </div>
    </nav>
      {/* ToastContainer for displaying notifications */}
    <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center bg-primary-subtle'>

          <MDBCol md='6'>
            <MDBCardImage src={ForgotPassword} alt='phone' className='rounded-t-5 rounded-tr-lg-0 ms-3' fluid />
          </MDBCol>

          <MDBCol md='6'>

            <MDBCardBody>

              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Email Id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
              </MDBCol>
                <MDBCol col='6'>
        <MDBRow>
            <MDBCol col='3'>
                <Link to="/user-login">
                    <button className="btn btn-primary mb-4 w-100 mt-4" onClick={handleSubmit}>Next</button>
                </Link>
            </MDBCol>
            <MDBCol col='3'>
              <button className="btn btn-secondary mb-4 w-100 mt-4" onClick={() => navigate('/')}>Cancel</button>
            </MDBCol>
        </MDBRow>
    </MDBCol>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  )
}

// Function to generate a random alphanumeric password
function generateRandomPassword() {
  const length = 4;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default UserForgotPassword
