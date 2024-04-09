import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
  const [QuizDetails, setQuizDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show,setshow]=useState(false)
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    quizName: '',
    trainingId: '',
    trainingName: '',
    maxScores: '',
    minScores: '',
    difficultyLevel: '',
    questionFile: ''
  });

  async function getdata(){
    await fetch("http://localhost:3001/getAllQuizData")
          .then(function (response) {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then(function (data) {
              // Convert data to array if it's not already an array
              const userDetailsArray = Array.isArray(data) ? data : [data];
              setQuizDetails(userDetailsArray[0].allQuizData);
              console.log('dd', QuizDetails)
              
          })
          .catch(function (error) {
              console.error("Error fetching user data:", error);
              setshow(true)
          });
  }
  useEffect(() => {
    if (!adminCheck) {
      navigate('/')
    }
    getdata()
    }, [show]);

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
    // Perform form validation
    if (!quizData.quizName || !quizData.trainingId || !quizData.trainingName || !quizData.maxScores || !quizData.minScores || !quizData.difficultyLevel || !quizData.questionFile) {
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
      <Button className='mt-3 me-4 float-end border border-2 border-dark' onClick={() => setShowModal(true)}>Create Quiz + </Button>

      <MDBRow className="h-100 d-flex justify-content-center align-items-center">
      <MDBCol md='12' className=' ms-5 ps-5 text-center text-md-start mt-5 pt-5'>
  <h2 className="card-title text-light ps-1">Quiz Details</h2>
  <MDBRow>
    {QuizDetails.map((quiz, index) => (
      <MDBCol md='4' key={index}>
        <MDBCard className="my-3 me-3 bg-secondary-subtle border border-2 border-dark fw-semibold">
          <MDBCardBody>
            <p className="card-text"><label className='fs-5 fw-semibold text-dark pe-1'>Quiz Name:</label> {quiz.quizName}</p>
            <p className="card-text"><label className='fs-5 fw-semibold text-dark pe-1'>Training ID: </label>{quiz.trainingId}</p>
       
            <p className="card-text"><label className='fs-5 fw-semibold text-dark pe-1'>Difficulty Level: </label>{quiz.difficultyLevel}</p>
            <p className="card-text"><label className='fs-5 fw-semibold text-dark pe-1'>Max Score: </label>{quiz.maxScores}</p>
            <p className="card-text"><label className='fs-5 fw-semibold text-dark pe-1'>Min Score:</label> {quiz.minScores}</p>
            <p className="card-text"><label className='fs-5 fw-semibold text-dark pe-1'>Question File: </label>{quiz.questionFile}</p>
            {/* Add more details as needed */}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    ))}
  </MDBRow>
</MDBCol>

      </MDBRow>

      <Modal show={showModal} onHide={() => setShowModal(false)} className='mt-5'>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className='fw-semibold'>
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
                <MDBInput id='maxScores' type='number' wrapperClass='mb-4' name='maxScores' onChange={handleInputChange} value={quizData.maxScores} min={1} max={100} required />
              </MDBCol>
              <MDBCol col='6'>
                <label htmlFor='minScores' className='form-label mb-1'>Minimum Score Required</label><span className='ms-1' style={{ color: 'red' }}>*</span>
                <MDBInput id='minScores' type='number' wrapperClass='mb-4' name='minScores' onChange={handleInputChange} value={quizData.minScores} min={1} max={100} required />
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
                <label htmlFor='questionFile' className='form-label mb-1'>Question File <span className='ms-1' style={{ color: 'red' }}>*</span>
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
                <button className="btn btn-secondary mb-4 w-100 mt-4" onClick={() => setShowModal(false)}>Cancel</button>
              </MDBCol>
            </MDBRow>
          </form>
        </Modal.Body>
      </Modal>
    </MDBContainer>
  )
}

export default QuizCreationPage;
