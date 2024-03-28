import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import BackImage from '../assets/back.jpg';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';

function UserLoginPage({onSubmit}) {

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
    // Here you can perform any actions with the form data, such as submitting it to a backend API
    onSubmit(formData)
    if(formData.email == 'kaustubhgupta@jmangroup.com' && formData.password == '600113') {
      navigate('/user-creation')
    }
    else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <MDBContainer className="my-5">
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
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src={BackImage} alt="login form" className='rounded-start w-100 h-100'/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Demo App</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email address</label>
            
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="form-control" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
              </div>
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Login</MDBBtn>
              
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  )
}

export default UserLoginPage;
