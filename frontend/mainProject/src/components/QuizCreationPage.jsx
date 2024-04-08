import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbars/Navbar'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function QuizCreationPage({ adminCheck, setAdminCheck }) {
  
  const navigate = useNavigate()
  const [quizData, setQuizData] = useState({
    quizName: '',
    trainingId: '',
    trainingName: '',
      maxScores: '',
      minScores: '',
    difficultyLevel: '',
    questionFile: ''
  });

  useEffect(() => {
    if (!adminCheck) {
      navigate('/')
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
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
    if (!quizData.quizName|| !quizData.trainingId || !quizData.trainingName || !quizData.maxScores || !quizData.minScores || !quizData.difficultyLevel || !quizData.questionFile) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // Submit trainer data
    axios
      .post('http://localhost:3001/submitQuizData', quizData)
      .then((response) => {
        console.log('Quiz data submitted successfully:', response.data);
        toast.success('Quiz data submitted successfully');
        setQuizData({
    quizName: '',
    trainingId: '',
    trainingName: '',
      maxScores: '',
      minScores: '',
    difficultyLevel: '',
    questionFile: ''
  })
      })
      .catch((error) => {
        console.error('Error submitting Quiz data:', error);
        toast.error('Failed to submit Quiz data. Please try again.');
      });
  };

  function back() {
    setQuizData({
    quizName: '',
    trainingId: '',
    trainingName: '',
      maxScores: '',
      minScores: '',
    difficultyLevel: '',
    questionFile: ''
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
            <span className="text-primary">Quiz Creation</span>
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
                  <MDBCol col='12'>
                    <label htmlFor='quizName' className='form-label mb-1'>Quiz Name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='quizName' type='text' wrapperClass='mb-4' name='quizName' onChange={handleInputChange} value={quizData.quizName} required />
                  </MDBCol>              
                 </MDBRow>  
                <MDBRow>
                  
                    <MDBCol col='6'>
                    <label htmlFor='trainingId' className='form-label mb-1'>Training Id</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainingId' type='text' wrapperClass='mb-4' name='trainingId' onChange={handleInputChange} value={quizData.trainingId} required />
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='trainingName' className='form-label mb-1'>Training Name</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='trainingName' type='text' wrapperClass='mb-4' name='trainingName' onChange={handleInputChange} value={quizData.trainingName} required />
                  </MDBCol>
                         
                 </MDBRow>  
                 <MDBRow>
                    <MDBCol col='6'>
                    <label htmlFor='maxScores' className='form-label mb-1'>Maximum Score </label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='maxScores' type='number' wrapperClass='mb-4' name='maxScores' onChange={handleInputChange} value={quizData.maxScores} min={1} max={100} required/>
                  </MDBCol>
                    <MDBCol col='6'>
                    <label htmlFor='minScores' className='form-label mb-1'>Minimum Score Required</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <MDBInput id='minScores' type='number' wrapperClass='mb-4' name='minScores' onChange={handleInputChange} value={quizData.minScores} min={1} max={100} required/>
                  </MDBCol>
                </MDBRow>                 
                <MDBRow>
                  <MDBCol col='6'>
                    <label htmlFor='difficultyLevel' className='form-label mb-1'>Difficulty Level</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                    <select className="form-select mb-4" id="difficultyLevel" name="difficultyLevel" onChange={handleInputChange} value={quizData.difficultyLevel} required>
                      <option value="">Select Difficulty Level</option>
                      <option value="easy">Easy</option>
                      <option value="moderate">Moderate</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </MDBCol>
                  <MDBCol col='6'>
                    <label htmlFor='questionFile' className='form-label mb-1'>Question File <span className='ms-1'style={{ color: 'red' }}>*</span>
                    <br /> <span>(only .xlsx or .csv or .json file to be uploaded)</span>
                    </label>
                    <div className='mb-4'>
                        <input id='questionFile' type='file' name='questionFile' onChange={handleInputChange} value={quizData.questionFile} accept='.xlsx, .json, .csv' required />
                    </div>
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


export default QuizCreationPage;
