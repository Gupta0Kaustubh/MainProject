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

function TrainingCreationPage() {
  const [trainingData, setTrainingData] = useState({
    trainingId:'',
    trainingName: '',
    trainingDescription: '',
    trainerId:'',
    trainerName: '',
    startDate: '',
    endDate: '',
    optimizedDuration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(trainingData);
    // Perform form validation
    if (!trainingData.trainingId || !trainingData.trainingName ||!trainingData.trainerId ||  !trainingData.trainerName || !trainingData.startDate || !trainingData.endDate || !trainingData.optimizedDuration) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // Submit training data
    axios
      .post('http://localhost:3001/submitTrainingData', trainingData)
      .then((response) => {
        console.log('Training data submitted successfully:', response.data);
        toast.success('Training data submitted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      })
      .catch((error) => {
        console.error('Error submitting training data:', error);
        toast.error('Failed to submit training data. Please try again.');
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
            <span className="text-primary">Training Creation</span>
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
                    <label htmlFor='trainerId' className='form-label mb-1'>Trainer Id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainerId' type='text' wrapperClass='mb-4' name='trainerId' onChange={handleInputChange} value={trainingData.trainerId}  />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='trainerName' className='form-label mb-1'>Trainer Name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainerName' type='text' wrapperClass='mb-4' name='trainerName' onChange={handleInputChange} value={trainingData.trainerName}  />
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
                
                <button type='submit' className='btn btn-secondary w-100 mb-2' size='md'>
                  Save
                </button>
              </form>
    
            </MDBCardBody>
            
          </MDBCard>
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}


export default TrainingCreationPage;
