import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';

function generateRandomPassword() {
  // Function to generate a random alphanumeric password
  const length = 8; // You can adjust the length of the password
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function UserCreationPage({onSubmit}) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    city: '',
    state: '',
    subscribeNewsletter: false,
    passwords: []
  });

  const [emailExists, setEmailExists] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUserData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if email already exists
    try {
      const response = await axios.get(`http://localhost:3001/checkEmail?email=${userData.email}`);
      if (response.data.exists) {
        setEmailExists(true);
        
        return;
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }

    setEmailExists(false);
    onSubmit(userData);
    
    axios.post('http://localhost:3001/submitUserData', userData)
      .then(response => {
        console.log('User data submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting user data:', error);
      });
  };

  return (
    <MDBContainer fluid className='p-4 pt-1' style={{ height: '100vh', overflowY: 'auto'}}>
      <MDBRow className="h-100 justify-content-center align-items-center">
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-3 display-3 fw-bold ls-tight px-3">
            <br />
            <span className="text-primary">User Registration</span>
          </h1>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>
          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Welcome to our platform, where innovation meets opportunity. Join us to unlock endless possibilities for your business growth. Our tailored solutions cater to your unique needs, ensuring seamless integration and success at every step. Elevate your business today and embark on a journey towards excellence with us.
          </p>
        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className='my-5' style={{backgroundColor:'#ffc8dd'}}>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='firstName' className='form-label mb-1'>First name</label>
                    <MDBInput id='firstName' type='text' wrapperClass='mb-4' name='firstName' onChange={handleInputChange} value={userData.firstName} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='lastName' className='form-label mb-1'>Last name</label>
                    <MDBInput id='lastName' type='text' wrapperClass='mb-4' name='lastName' onChange={handleInputChange} value={userData.lastName} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='email' className='form-label mb-1'>Email</label>
                    <MDBInput id='email' type='email' wrapperClass='mb-4' name='email' onChange={handleInputChange} value={userData.email} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='phoneNumber' className='form-label mb-1'>Phone Number</label>
                    <MDBInput id='phoneNumber' type='tel' wrapperClass='mb-4' name='phoneNumber' onChange={handleInputChange} value={userData.phoneNumber} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                  <MDBCol md='12'>
                    <div className="d-flex">
                      <label htmlFor='gender' className='form-label mb-1'>Gender</label>
                      <MDBCheckbox name='gender' value='male' id='male' label='Male' className='ms-2 me-2' onChange={handleInputChange} checked={userData.gender === 'male'} />
                      <MDBCheckbox name='gender' value='female' id='female' label='Female' className='ms-2 me-2' onChange={handleInputChange} checked={userData.gender === 'female'} />
                      <MDBCheckbox name='gender' value='other' id='other' label='Other' className='ms-2 me-2' onChange={handleInputChange} checked={userData.gender === 'other'} />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='dob' className='form-label mb-1'>Date of Birth</label>
                    <MDBInput id='dob' type='date' wrapperClass='mb-4' name='dob' onChange={handleInputChange} value={userData.dob} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='city' className='form-label mb-1'>City</label>
                    <MDBInput id='city' type='text' wrapperClass='mb-4' name='city' onChange={handleInputChange} value={userData.city} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='12'>
                    <label htmlFor='state' className='form-label mb-1'>State</label>
                    <MDBInput id='state' type='text' wrapperClass='mb-4' name='state' onChange={handleInputChange} value={userData.state} />
                  </MDBCol>
                </MDBRow>
                <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox name='subscribeNewsletter' id='flexCheckDefault' label='Subscribe to our newsletter' onChange={handleInputChange} checked={userData.subscribeNewsletter} />
                </div>
                <MDBBtn type="submit" className='w-100 mb-2' size='md'>Sign up</MDBBtn>
              </form>
              <div className="text-center">
                <p>Or</p>
                <Link to='/user-login'><MDBBtn type="submit" className='w-100 mt-2 mb-4' size='md'>Log In</MDBBtn></Link>
                </div>
              <div className="text-center">
                <p>or sign up with:</p>
                <div className='d-flex justify-content-center'>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm" />
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm" />
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm" />
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm" />
                  </MDBBtn>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default UserCreationPage;
