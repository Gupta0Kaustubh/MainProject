import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import BackImage from '../assets/back.jpg';
import './styles/buttonStyle.css'
  
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

function UserLoginPage({setIsLoggedIn ,onSubmit}) {

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

  async function runScripts() {
    try {
      const pythonResponse = await fetch('http://localhost:3001/execute-python-script', {
        method: 'POST',
      });
      if (!pythonResponse.ok) {
        throw new Error('Failed to execute Python script');
      }
      console.log('Python retrieval executed successfully');

      // Snow
      const pythonResponseSnow = await fetch('http://localhost:3001/execute-snow-python-script', {
        method: 'POST',
      });
      if (!pythonResponseSnow.ok) {
        throw new Error('Failed to execute Snow Python script');
      }
      console.log('Snow Python retrieval executed successfully');
  
      // Execute DBT
      const dbtResponse = await fetch('/rundbt', { method: 'GET' });
      if (!dbtResponse.ok) {
        throw new Error('DBT execution failed');
      }
  
      console.log('DBT executed successfully');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to execute Python script or DBT');
    }
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  
    const isAdmin = UserDetails.allUserData.find(user => user.email === formData.email && user.passwords === formData.password && (user.userType === 'Admin' || user.userType === 'admin'));
    const isUser = UserDetails.allUserData.find(user => user.email === formData.email && user.passwords === formData.password);
  
    if (isUser) {
      try {
        await runScripts();
        if (formData.password.length === 4) {
          toast.success('Redirecting to the change password page');
          setTimeout(() => {
            navigate('/user-forgot');
          }, 2000);
        } else if (isAdmin) {
          toast.success('Redirecting to the Admin Dashboard');
          setIsLoggedIn(true)
          localStorage.setItem("role",'Admin')
          localStorage.setItem('isLoggedIn',true)
          setTimeout(() => {
            navigate('/admin-dashboard');
          }, 3000);
        } else {
          toast.success('Redirecting to the Employee Dashboard');
          setIsLoggedIn(true)
          localStorage.setItem("role",'Employee')
          localStorage.setItem('isLoggedIn',true)
          localStorage.setItem('email', formData.email);
          setTimeout(() => {
            navigate('/emp-dashboard');
          }, 3000);
        }
      } catch (error) {
        toast.error('Error executing scripts: ' + error.message);
      }
    } else {
      setIsLoggedIn(false)
      toast.error('Invalid username or password');
    }
  }
  


  return (
    <MDBContainer className="my-5">
      <nav className="navbar bg-tertiary mb-3">
      <div className="container-fluid">
        <h1 className='text-light p-2' style={{boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>TalentEdge Hub</h1>
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
        <MDBRow className='g-0 '>
          <MDBCol md='6'>
            <MDBCardImage src='https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=' alt="login form" className=' imageLogin rounded-start'/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column fw-semibold ' style={{boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="won-sign fa-3x me-3" style={{ color: '#ff6219' }}/>
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
