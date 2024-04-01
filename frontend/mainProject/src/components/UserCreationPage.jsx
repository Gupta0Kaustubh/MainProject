import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbars/Navbar';

import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

function UserCreationPage({ onSubmit }) {
  
  const [userData, setUserData] = useState({
    userId:'',
    firstName: '',
    middleName:'',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '', // Modified to store gender as string instead of boolean
    doj: '',
    specializations:'',
    dob: '',
    city: '',
    state: '',
    experience:'',
    userType: '',
    subscribeNewsletter: false,
  });

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

    // Generate random password
    const password = generateRandomPassword();

    // Update user data with the generated password
    const updatedUserData = { ...userData, passwords: password };
    onSubmit(updatedUserData);

    // Perform form validation
    if (!userData.userId || !userData.firstName || !userData.lastName || !userData.email || !userData.phoneNumber || !userData.gender || !userData.doj || !userData.specializations || !userData.dob || !userData.state || !userData.experience || !userData.userType) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // Submit user data
    axios.post('http://localhost:3001/submitUserData', updatedUserData)
      .then(response => {
        console.log('User data submitted successfully:', response.data);
        toast.success('User data submitted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      })
      .catch(error => {
        console.error('Error submitting user data:', error);
        toast.error('Failed to submit user data. Please try again.');
      });
  };

  return (
    <MDBContainer fluid className='p-4 pt-1' style={{ height: '100vh', overflowY: 'auto' }}>
      <Navbar />
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
      <MDBRow className="h-100 justify-content-center align-items-center">
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-3 display-3 fw-bold ls-tight px-3">
            <br />
            <span className="text-primary">User Creation</span>
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
          <MDBCard className='my-5 bg-primary-subtle'>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='userId' className='form-label mb-1'>User Id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' onChange={handleInputChange} value={userData.userId} />
                  </MDBCol>
                  
                  <MDBCol col='6'>
                    <label htmlFor='email' className='form-label mb-1'>Email</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='email' type='email' wrapperClass='mb-4' name='email' onChange={handleInputChange} value={userData.email} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='4'>
                    <label htmlFor='firstName' className='form-label mb-1'>First name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='firstName' type='text' wrapperClass='mb-4' name='firstName' onChange={handleInputChange} value={userData.firstName} />
                  </MDBCol>
                  <MDBCol col='4'>
                    <label htmlFor='middleName' className='form-label mb-1'>Middle name</label>
                    <MDBInput id='middleName' type='text' wrapperClass='mb-4' name='middleName' onChange={handleInputChange} value={userData.middleName} />
                  </MDBCol>
                  <MDBCol col='4'>
                    <label htmlFor='lastName' className='form-label mb-1'>Last name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='lastName' type='text' wrapperClass='mb-4' name='lastName' onChange={handleInputChange} value={userData.lastName} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='6'>
                    <label className='form-label mb-1'>Gender</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <div className="d-flex">
                      <div className="form-check me-4">
                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={handleInputChange} checked={userData.gender === 'male'} />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check me-4">
                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={handleInputChange} checked={userData.gender === 'female'} />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                      <div className="form-check ">
                        <input className="form-check-input" type="radio" name="gender" id="other" value="other" onChange={handleInputChange} checked={userData.gender === 'other'} />
                        <label className="form-check-label" htmlFor="other">
                          Other
                        </label>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='phoneNumber' className='form-label mb-1'>Phone Number</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='phoneNumber' type='tel' wrapperClass='mb-4' name='phoneNumber' onChange={handleInputChange} value={userData.phoneNumber} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3">
                <MDBCol col='6'>
                    <label htmlFor='dob' className='form-label mb-1'>Date of Birth</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='dob' type='date' wrapperClass='mb-4' name='dob' onChange={handleInputChange} value={userData.dob} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='doj' className='form-label mb-1'>Date of Joining</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='doj' type='date' wrapperClass='mb-4' name='doj' onChange={handleInputChange} value={userData.doj} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='state' className='form-label mb-1'>State</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='state' type='text' wrapperClass='mb-4' name='state' onChange={handleInputChange} value={userData.state} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='city' className='form-label mb-1'>City</label>
                    <MDBInput id='city' type='text' wrapperClass='mb-4' name='city' onChange={handleInputChange} value={userData.city} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol col='12'>
                    <label htmlFor='specializations' className='form-label mb-1'>Specializations (use comma, if more than 1)</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='specializations' type='text' wrapperClass='mb-4' name='specializations' onChange={handleInputChange} value={userData.specializations} />
                  </MDBCol>
                  
                </MDBRow>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='experience' className='form-label mb-1'>Experience (in years)</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='experience' type='number' wrapperClass='mb-4' name='experience' onChange={handleInputChange} value={userData.experience} min={0} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='userType' className='form-label mb-1'>User Type</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <select className="form-select mb-4" id="userType" name="userType" onChange={handleInputChange} value={userData.userType}>
                      <option value="">Select User Type</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  </MDBCol>
                </MDBRow>
                <div className='d-flex justify-content-center mb-4'>
                  <MDBCheckbox name='subscribeNewsletter' id='flexCheckDefault' label="Subscription required for the company's newsletter" onChange={handleInputChange} checked={userData.subscribeNewsletter} />
                </div>
                <MDBRow>
            <MDBCol col='3'>  
                    <button className="btn btn-primary mb-4 w-100 mt-4" onClick={handleSubmit}>Save</button>
              
            </MDBCol>
            <MDBCol col='3'>
              <button className="btn btn-secondary mb-4 w-100 mt-4" onClick={() => window.location.reload()}>Cancel</button>
            </MDBCol>
        </MDBRow>
              </form>
            </MDBCardBody>
            
          </MDBCard>
          
        </MDBCol>
      </MDBRow>
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

export default UserCreationPage;
