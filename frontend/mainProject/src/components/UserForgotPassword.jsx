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
import ForgotPassword from '../assets/forgotpassword.jpg'

function UserForgotPassword() {

  const navigate = useNavigate();

  const [UserDetails, setUserDetails] = useState([]);
  const [passChange, setPassChange] = useState({
    email: '',
    defaultpassword: '',
    newpassword: '',
    newpasswordagain: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassChange({
      ...passChange,
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
    if (passChange.newpassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
    }
    else if(passChange.newpassword != passChange.newpasswordagain) {
      toast.error('Enter the new password in both the fields same !!');
      // navigate('/user-creation')
    }
    else {
      const isUser = UserDetails.allUserData.find(user => user.email === passChange.email && user.passwords == passChange.defaultpassword);
      if(isUser){
        axios.post('http://localhost:3001/changePassword', {
          email: passChange.email,
          newPassword: passChange.newpassword
      })
      .then(response => {
        console.log('User data modified successfully:', response.data);
        toast.success('User password modified successfully !!');
        setTimeout(() => {
          navigate('/');
      }, 4000);
        
      })
      .catch(error => {
        console.error('Error modifying user data:', error);
        
      });
      }
      else {
        toast.error('User Not Present !!');
      }
    }
    
  };

  return (
    <MDBContainer className='my-5'>
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

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src={ForgotPassword} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Enter your Email ID</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    value={passChange.email} 
                    onChange={handleChange} 
                    required 
                  />
              </MDBCol>
              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Enter your default Password</label>
                  <input 
                    type="password" 
                    id="password1" 
                    name="defaultpassword" 
                    className="form-control" 
                    value={passChange.defaultpassword} 
                    onChange={handleChange} 
                    required 
                  />
              </MDBCol>
              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Enter your new Password</label>
                  <input 
                    type="password" 
                    id="password2" 
                    name="newpassword" 
                    className="form-control" 
                    value={passChange.newpassword} 
                    onChange={handleChange} 
                    required 
                  />
              </MDBCol>
              <MDBCol col='6'>
                  <label htmlFor='password' className='form-label mb-1'>Re-Enter your new Password</label>
                  <input 
                    type="password" 
                    id="password3" 
                    name="newpasswordagain" 
                    className="form-control" 
                    value={passChange.newpasswordagain} 
                    onChange={handleChange} 
                    required 
                  />
                </MDBCol>

                <Link to="/user-login">
                <button className="btn btn-primary mb-4 w-100" onClick={handleSubmit}>Save</button>
              </Link>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  )
}

export default UserForgotPassword
