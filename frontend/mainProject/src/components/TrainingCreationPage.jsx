import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbars/Navbar';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

function TrainingCreationPage({setIsLoggedIn}) {

  const navigate = useNavigate()
  const [trainingData, setTrainingData] = useState({
    trainingId:'',
    trainingName: '',
    trainingDescription: '',
    trainerId: '',
    trainerName:'',
    startDate: '',
    endDate: '',
    optimizedDuration: '',
    timingOfTraining: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainingData((prevData) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runScripts()
    console.log(trainingData);
    // Perform form validation
    if (!trainingData.trainingId || !trainingData.trainingName ||!trainingData.trainerId || !trainingData.startDate || !trainingData.endDate || !trainingData.optimizedDuration) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // Submit training data
    axios
      .post('http://localhost:3001/submitTrainingData', trainingData)
      .then((response) => {
        console.log('Training data submitted successfully:', response.data);
        toast.success('Training data submitted successfully');
        setTrainingData({
          trainingId:'',
    trainingName: '',
    trainingDescription: '',
    trainerId:'',
    startDate: '',
    endDate: '',
    optimizedDuration: '',
    timingOfTraining: ''
        })
      })
      .catch((error) => {
        console.error('Error submitting training data:', error);
        toast.error('Failed to submit training data. Please try again.');
      });
  };

  function back() {
    setTrainingData({
      trainingId:'',
    trainingName: '',
    trainingDescription: '',
    trainerId:'',
    startDate: '',
    endDate: '',
    optimizedDuration: '',
    timingOfTraining: ''
    })
  }

  return (
    <MDBContainer fluid className='p-4 pt-1' style={{ height: '100vh', overflowY: 'auto' }}>
      <Navbar setIsLoggedIn={setIsLoggedIn} />

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
            <span className="text-light ">User Creation</span>
          </h1>
          <h1 className="my-5 text-dark display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-light">for your business</span>
          </h1>
          <p className='px-3 text-dark-emphasis'>
            Welcome to our platform, where innovation meets opportunity. Join us to unlock endless possibilities for your business growth. Our tailored solutions cater to your unique needs, ensuring seamless integration and success at every step. Elevate your business today and embark on a journey towards excellence with us.
          </p>
        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className='my-5 bg-secondary-subtle border border-2 border-dark fw-semibold'>
            <MDBCardBody className='p-5'>
                <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='trainingId' className='form-label mb-1'>Training Id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainingId' type='text' wrapperClass='mb-4' name='trainingId' onChange={handleInputChange} value={trainingData.trainingId}  />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='trainingName' className='form-label mb-1'>Training Name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainingName' type='text' wrapperClass='mb-4' name='trainingName' onChange={handleInputChange} value={trainingData.trainingName}  />
                  </MDBCol>
                  
                                  
                </MDBRow>                   
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='timingOfTraining' className='form-label mb-1'>Timing Of Training</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='timingOfTraining' type='text' wrapperClass='mb-4' name='timingOfTraining' onChange={handleInputChange} value={trainingData.timingOfTraining}  />
                    </MDBCol>
                    <MDBCol col='6'>
                    <label htmlFor='trainerId' className='form-label mb-1'>Trainer Id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainerId' type='text' wrapperClass='mb-4' name='trainerId' onChange={handleInputChange} value={trainingData.trainerId}  />
                  </MDBCol>
                                  
                </MDBRow>                   
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='startDate' className='form-label mb-1'>Start Date</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='startDate' type='date' wrapperClass='mb-4' name='startDate' onChange={handleInputChange} value={trainingData.startDate} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='endDate' className='form-label mb-1'>End Date</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='endDate' type='date' wrapperClass='mb-4' name='endDate' onChange={handleInputChange} value={trainingData.endDate} />
                  </MDBCol>
                </MDBRow>   

                <MDBRow>
                    <MDBCol col='6'>
                    <label htmlFor='trainingDescription' className='form-label mb-1'>Training Description</label>
                    <MDBInput id='trainingDescription' type='text' wrapperClass='mb-4' name='trainingDescription' onChange={handleInputChange} value={trainingData.trainingDescription} />
                  </MDBCol>
                    <MDBCol col='6'>
                    <label htmlFor='optimizedDuration' className='form-label mb-1'>Optimized Duration (in hours)</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='optimizedDuration' type='number' wrapperClass='mb-4' name='optimizedDuration' onChange={handleInputChange} value={trainingData.optimizedDuration} min={1} />
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


export default TrainingCreationPage;
