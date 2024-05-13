import React from 'react'
import Navbar from './navbars/EmpNavbar'
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/buttonStyle.css'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
  } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
  
const PredictionPage = ({setIsLoggedIn}) => {

    const [showModal, setShowModal] = useState(false);
    const [show,setshow]=useState(false)
    const [UserDetails, setUserDetails] = useState([]);
    const [trainingData, setTrainingData] = useState({
        experience: '',
        optimizedDuration: ''
      });

      useEffect(() => {
        // Getting UserData
        fetch("http://localhost:3001/getAllAdminUserData")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(function (data) {
                // Convert data to array if it's not already an array
                const userDetailsArray = Array.isArray(data) ? data : [data];
              setUserDetails(userDetailsArray[0].allUserData);
                
            })
            .catch(function (error) {
              console.error("Error fetching user data:", error);
              setshow(true)
            });
      }, [show]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrainingData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
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
  
  const [time, setTime] = useState(0)
  const [hours, setHours] = useState(0)

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
      const response = await axios.post('http://127.0.0.1:5000/predict', trainingData);
          console.log('Predicted Output:', response.data.prediction);
          setTime(response.data.prediction) 
    } catch (error) {
      console.error('Error:', error);
        }
        
        try {
      const response = await axios.post('http://127.0.0.1:5000/predict1', trainingData);
          console.log('Predicted Output:', response.data.prediction);
          setHours(response.data.prediction) 
    } catch (error) {
      console.error('Error:', error);
        }
        if(hours && time) {
          setShowModal(true)
        }
        
        
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
        
        <MDBCol md='6'>
          <MDBCard className='my-5 bg-secondary-subtle border border-2 border-dark fw-semibold'>
            <MDBCardBody className='p-5'>
                <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='gender' className='form-label mb-1'>Gender</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='gender' type='text' wrapperClass='mb-4' name='gender' value={trainingData.gender}  />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='specialization' className='form-label mb-1'>Specialization</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='specialization' type='text' wrapperClass='mb-4' name='specialization' value={trainingData.specialization}  />
                  </MDBCol>
                  
                                  
                </MDBRow>                   
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='experience' className='form-label mb-1'>Experience (in years)</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='experience' type='text' wrapperClass='mb-4' name='experience' onChange={handleInputChange} value={trainingData.experience}  />
                    </MDBCol>
                    <MDBCol col='6'>
                    <label htmlFor='difficultyLevel' className='form-label mb-1'>Difficulty Level</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <select className="form-select mb-4" id="difficultyLevel" name="difficultyLevel" value={trainingData.difficultyLevel} required>
                      <option value="">Select Difficulty Level</option>
                      <option value="easy">Easy</option>
                      <option value="moderate">Moderate</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </MDBCol>
                                  
                </MDBRow>                    

                <MDBRow>
                    <MDBCol col='6'>
                    <label htmlFor='trainingName' className='form-label mb-1'>Training Name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <select className="form-select mb-4" id="trainingName" name="trainingName" value={trainingData.trainingName}>
    <option value="">Select Training Name</option>
    {[...new Set(UserDetails.map(userData => userData.trainingName))].map((uniqueTrainingName, index) => (
      <option key={index} value={uniqueTrainingName}>{uniqueTrainingName}</option>
    ))}
  </select>
                  </MDBCol>
                    <MDBCol col='6'>
                    <label htmlFor='optimizedDuration' className='form-label mb-1'>Optimized Duration (in hours)</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='optimizedDuration' type='number' wrapperClass='mb-4' name='optimizedDuration' onChange={handleInputChange} value={trainingData.optimizedDuration} min={1} />
                  </MDBCol>
                </MDBRow>               
                <MDBRow>
            <MDBCol col='3'>  
                    <button className="btn btn-primary mb-4 w-100 mt-4" onClick={handleSubmit}>Submit</button>
              
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

      <Modal show={showModal} onHide={() => setShowModal(false)} className='dialoguee'>
        <Modal.Header closeButton>
          <Modal.Title>Predictions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mt-3 mb-5 pt-3 pb-3 fw-bolder fs-6 text-primary'>Predicted Assessment Completion Time : <label className='text-black fw-medium'> &nbsp;{time}  hrs.</label></div>
          <div className='mt-5 mb-3 pt-3 pb-3 fw-bolder fs-6 text-primary'>Predicted Score Achieved After Training : <label className='text-black fw-medium'> &nbsp;{hours} / 100</label> </div>
        </Modal.Body>
      </Modal>
    </MDBContainer>
    
  )
}

export default PredictionPage