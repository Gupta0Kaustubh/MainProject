import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbars/Navbar';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function TrainerCreationPage({ adminCheck, setAdminCheck }) {
  
  const navigate = useNavigate()
  const [trainerData, setTrainerData] = useState({
    userId:'',
    trainerName: '',
      trainerDesignation: '',
    trainerRating: 1,
    trainerSpecialization: ''
  });

  useEffect(() => {
    if (!adminCheck) {
      navigate('/')
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function runScripts() {
    try {
      const pythonResponse = await fetch('http://localhost:3001/execute-python-script', {
        method: 'POST',
      });
      if (!pythonResponse.ok) {
        throw new Error('Failed to execute Python script');
      }
      console.log('Python retrieval executed successfully');
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runScripts()

    // Perform form validation
    if (!trainerData.userId || !trainerData.trainerName || !trainerData.trainerDesignation || !trainerData.trainerSpecialization) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // Submit trainer data
    axios
      .post('http://localhost:3001/submitTrainerData', trainerData)
      .then((response) => {
        console.log('Trainer data submitted successfully:', response.data);
        toast.success('Trainer data submitted successfully');
        setTrainerData({
          userId:'',
    trainerName: '',
      trainerDesignation: '',
    trainerRating: 1,
    trainerSpecialization: ''
        })
      })
      .catch((error) => {
        console.error('Error submitting trainer data:', error);
        toast.error('Failed to submit trainer data. Please try again.');
      });
  };

  function back() {
    setTrainerData({
      userId:'',
    trainerName: '',
      trainerDesignation: '',
    trainerRating: 1,
    trainerSpecialization: ''
    })
  }

  return (
    <MDBContainer fluid className='p-4 pt-1' style={{ height: '100vh', overflowY: 'auto' }}>
      <Navbar setAdminCheck={setAdminCheck} />
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
            <span className="text-primary">Trainer Creation</span>
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
                    <label htmlFor='userId' className='form-label mb-1'>Trainer/Employee id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' onChange={handleInputChange} value={trainerData.userId} required />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='trainerName' className='form-label mb-1'>Trainer Name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainerName' type='text' wrapperClass='mb-4' name='trainerName' onChange={handleInputChange} value={trainerData.trainerName} required />
                  </MDBCol>
                </MDBRow>          
                <MDBRow>
              
                  <MDBCol col='6'>
                    <label htmlFor='trainerDesignation' className='form-label mb-1'>Trainer Designation</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainerDesignation' type='text' wrapperClass='mb-4' name='trainerDesignation' onChange={handleInputChange} value={trainerData.trainerDesignation} required/>
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='trainerRating' className='form-label mb-1'>Trainer Rating</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <select className="form-select mb-4" id="userType" name="trainerRating" onChange={handleInputChange} value={trainerData.trainerRating} required>
                      <option value="">Select Trainer Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </MDBCol>
                </MDBRow>          
                <MDBRow>
                  <MDBCol col='12'>
                    <label htmlFor='trainerSpecialization' className='form-label mb-1'>Trainer Specializations (use comma, if more than 1)</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainerSpecialization' type='text' wrapperClass='mb-4' name='trainerSpecialization' onChange={handleInputChange} value={trainerData.trainerSpecialization} required />
                  </MDBCol>
                  
                </MDBRow>          
                <MDBRow>
            <MDBCol col='3'>  
                    <button className="btn btn-primary mb-4 w-100 mt-4" onClick={handleSubmit}>Save</button>
              
            </MDBCol>
            <MDBCol col='3'>
              <button className="btn btn-secondary mb-4 w-100 mt-4" onClick={() => back()}>Cancel</button>
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


export default TrainerCreationPage;
