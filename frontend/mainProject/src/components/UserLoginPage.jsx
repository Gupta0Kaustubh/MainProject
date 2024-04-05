import React, {useState, useEffect} from 'react';
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
  const [UserDetails, setUserDetails] = useState([]);

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

  useEffect(() => {
    // Getting UserData
    fetch("http://localhost:3001/getAllUserData")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        setUserDetails(data);
        console.log("UserDetails:",UserDetails);
      })
      .catch(function (error) {
        if (error instanceof SyntaxError) {
          console.error("Empty or invalid JSON response");
        } else {
          console.error("Error fetching user data:", error);
        }
        throw error;
      });
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();
    // Here you can perform any actions with the form data, such as submitting it to a backend API
    onSubmit(formData)
    const isAdmin = UserDetails.allUserData.find(user => user.email === formData.email && user.passwords == formData.password && (user.userType== 'Admin' || user.userType == 'admin'));
    console.log("User Type",UserDetails);
    const isUser = UserDetails.allUserData.find(user => user.email === formData.email && user.passwords == formData.password);
    if(isUser) {
      if(formData.password.length == 4) {
        toast.success('Redirecting to the change password page');
          setTimeout(() => {
            navigate('/user-forgot');
        }, 2000);
        
      }
      else if(isAdmin) {
        toast.success('Redirecting to the Admin Dashboard');
        setTimeout(() => {
          navigate('/admin-dashboard');
      }, 2000);
      }
      else  {
        toast.success('Redirecting to the Employee Dashboard');
        localStorage.setItem('email',formData.email)
        setTimeout(() => {
          navigate('/emp-dashboard');
      }, 4000);
      }
    }
    else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <MDBContainer className="my-5">
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
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src={BackImage} alt="login form" className='rounded-start w-100 h-100'/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">USER LOGIN</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email address</label><span className='ms-1' style={{ color: 'red' }}>*</span>
            
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
                <label htmlFor="password" className="form-label">Password</label><span className='ms-1' style={{ color: 'red' }}>*</span>
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
              <MDBRow>
            <MDBCol col='3'>  
                    <button className="btn btn-primary mb-4 w-100 mt-4" onClick={handleSubmit}>Login</button>
              
            </MDBCol>
            <MDBCol col='3'>
              <button className="btn btn-secondary mb-4 w-100 mt-4" onClick={() => navigate('/forgot-password')}>Forgot Password ?</button>
            </MDBCol>
        </MDBRow>
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

export default UserLoginPage;
