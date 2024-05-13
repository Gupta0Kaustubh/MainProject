import React,{useState, useEffect} from 'react'
import Navbar from './navbars/EmpNavbar';
import EventCalender from '../components/calendar/EventCalender'
import { Button, DialogActions, DialogContent, DialogContentText, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles/buttonStyle.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EmpCalendar = ({matchedUserEmail, setIsLoggedIn}) => {
  
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false)
  const UserEmail = localStorage.getItem('email')
  const [UserDetails, setUserDetails] = useState([]);
    const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    userId: '',
    Name: '',
    email: '',
    gender: '',
    specializations: '',
    doj:'',
    state:'',
    experience:'',
    trainingName:'',
    trainerName:'',
    optimizedDuration:'',
    trainingStatus:'pendiing',
    assessment_percentage_done:'0',
    assessment_completion_time_in_hours:'',
    scoreAchievedInQuiz:'',
    quizPassedOrFailed:'',
    ratingGivenByTrainer:''
  });

  
  useEffect(() => {

    fetch("http://localhost:3001/getAllUserData")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        const singleUserData = data.allUserData.find(user => user.email === UserEmail);
    if (!singleUserData) {
      console.error("User not found");
      return;
    }
        setUserDetails(singleUserData);
        console.log("UserData:", UserDetails);
        if(UserDetails.length == 0) setReload(true)
      })
      .catch(function (error) {
        if (error instanceof SyntaxError) {
          console.error("Empty or invalid JSON response");
        } else {
          console.error("Error fetching user data:", error);
        }
        throw error;
      });
      
        // Fetch training data
        fetch("http://localhost:3001/getAllTrainingData")
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(trainingData => {
    
            const mappedData = trainingData.allTrainingData.map(training => {
              // Generate a random color
              function generateLightColor() {
                // Generate light colors by ensuring each RGB component has a higher value
                const r = Math.floor(Math.random() * 128) + 128; // R component between 128 and 255
                const g = Math.floor(Math.random() * 128) + 128; // G component between 128 and 255
                const b = Math.floor(Math.random() * 128) + 128; // B component between 128 and 255
                return `rgb(${r}, ${g}, ${b})`;
            }
            
              const randomColor = generateLightColor();
              
              let enddate = new Date(training.endDate).toISOString().split('T')[0];
              let startdate = new Date(training.startDate).toISOString().split('T')[0];
              
              return {
                id: training._id,
                startDate: new Date(training.startDate), 
                endDate: new Date(training.endDate), 
                
                popupContent: (
                  <>
                    <DialogContent className='dialogue bg-slate-400'>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label>Training Description : &nbsp;</label>{training.trainingDescription}
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label>Trainer Name : &nbsp;</label>{training.trainerName}
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label>Training Duration : &nbsp;</label>{training.timingOfTraining}
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label>Start Date : &nbsp;</label>{startdate}
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label>End Date : &nbsp;</label>{enddate}
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label>Optimized Duration : &nbsp;</label>{training.optimizedDuration} hrs
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <label style={{cursor: 'pointer', color: 'black', transition: 'color 0.3s'}}>HackerRank Link : &nbsp; https://www.hackerrank.com/{training.trainingName}</label>
                      </DialogContentText>
                      <DialogContentText id={`alert-dialog-description-${training._id}`}>
                        <button className='btn btn-outline-info mt-2 px-5 ms-2' onClick={() => handleEnroll(training)}>Enroll</button>
                      </DialogContentText>
                    </DialogContent>
                  </>
                ),
                title: training.trainingName,
                color: randomColor, // Assign the random color
              };
            });
            setData(mappedData);
          })
          .catch(error => {
            if (error instanceof SyntaxError) {
              console.error("Empty or invalid JSON response");
            } else {
              console.error("Error fetching training data:", error);
            }
          });
  }, [reload]);
  
  const handleEnroll = (training) => {
    // Set userData state
    setCheck(true)
  setUserData({
    userId: UserDetails.userId,
    Name: UserDetails.firstName,
    email: UserDetails.email,
    gender: UserDetails.gender,
    specializations: UserDetails.specializations,
    doj: UserDetails.doj,
    state: UserDetails.state,
    experience: UserDetails.experience,
    trainingName: training.trainingName,
    trainerName: training.trainerName,
    optimizedDuration: training.optimizedDuration,
    trainingStatus: 'pending',
    assessment_percentage_done: '0',
    assessment_completion_time_in_hours: '',
    scoreAchievedInQuiz: '',
    quizPassedOrFailed: '',
    ratingGivenByTrainer: '',
  });

};


  useEffect(() => {
    console.log('userData', userData);
    // Send POST request to submit training data
    if (check) {
      axios
    .post('http://localhost:3001/submitAllAdminUserData', userData) // Using userData directly
    .then((response) => {
      console.log('Training enrolled successfully:', response.data);
      toast.success('Training enrolled successfully');
      
    })
    .catch((error) => {
      console.error('Error submitting training data:', error);
      toast.error('Failed to enroll. Please try again.');
    });
    }
  
  }, [userData]);
  
    return (
      <>
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
        <Stack width='100%' minHeight='100vh' justifyContent='center'>
          <EventCalender data={data} onDataChange={setData} />
        </Stack>
      </>
    )
}

export default EmpCalendar