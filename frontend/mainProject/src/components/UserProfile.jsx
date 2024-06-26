import React, {useState, useEffect} from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
  } from 'mdb-react-ui-kit';
import Navbar from './navbars/EmpNavbar';
import './styles/buttonStyle.css'
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ matchedUserEmail, setIsLoggedIn }) => {

  const [isDisplayed, setIsDisplayed] = useState(false);

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
  const navigate = useNavigate()

  const handleClick = () => {
      setIsDisplayed(true);
  };

    const UserEmail = localStorage.getItem('email')

    const [UserDetails, setUserDetails] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);
  let user = matchedUserEmail
  

  const getUserData = () => {
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
                setUserDetails(data.allUserData);
                
                const matchedUsers = data.allUserData.filter(user =>  user.email == UserEmail);
                setMatchedUsers(matchedUsers);
                user = matchedUsers.length > 0 ? matchedUsers[0] : null;
               
            })
            .catch(function (error) {
                console.error("Error fetching user data:", error);
            });
  }

    useEffect(() => {
      // Getting UserData
      getUserData();       

        }, []);
    
    return (
        <>
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <button type="button" className="btn btn-outline-warning  px-5 d-flex justify-content-center button_style mb-4" onClick={handleClick}>Show Details !!!</button>
        {isDisplayed && (
        <MDBContainer fluid className='p-4 pt-1' style={{ height: '100vh', overflowY: 'visible' }}>
            
      <MDBRow className="h-100 justify-content-center align-items-center">
        
        <MDBCol md='12'>
          <MDBCard className=' bg-secondary-subtle border border-2 border-dark fw-semibold'>
          
            <MDBCardBody className='p-5'>
            <h2 className='pb-2'>User Details</h2>
              <form>
                <MDBRow>
                  <MDBCol col='2'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>User Id</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].userId} />
                  </MDBCol>
                  <MDBCol col='2'>
                    <label htmlFor='Name' className='form-label mb-1 ms-3'>Name</label>
                    <MDBInput id='Name' type='text' wrapperClass='mb-4' name='Name' value={matchedUsers[0].Name} />
                  </MDBCol>
                  <MDBCol col='2'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>Email Id</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].email} />
                  </MDBCol>
                  <MDBCol col='2'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>Gender</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].gender} />
                  </MDBCol>
                  
                </MDBRow>
                <MDBRow>
                  <MDBCol col='2'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>Date Of Joining</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].doj} />
                  </MDBCol>
                  <MDBCol col='2'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>State</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].state} />
                  </MDBCol>
                <MDBCol col='2'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>Experience (in years)</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].experience} />
                  </MDBCol>
                  <MDBCol col='10'>
                    <label htmlFor='userId' className='form-label mb-1 ms-3'>User Specializations</label>
                    <MDBInput id='userId' type='text' wrapperClass='mb-4' name='userId' value={matchedUsers[0].specializations} />
                  </MDBCol>
                  
                </MDBRow>
                <h2 className='pb-2'>Training Details</h2>
                <MDBRow>
                                    <MDBCol col='1'>
                                        <label htmlFor='trainingName' className='form-label mb-1'>Training Name</label>
                                        
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        <label htmlFor='trainerName' className='form-label mb-1'>Trainer Name</label>
                                       
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        <label htmlFor='optimizedDuration' className='form-label mb-1'>Optimized Duration (in hours)</label>
                                      
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        <label htmlFor='trainingStatus' className='form-label mb-1'>Training Status</label>
                                       
                                    </MDBCol>
                                
                               
                                    <MDBCol col='1'>
                                        <label htmlFor='assessmentPercentageDone' className='form-label mb-1'>Percentage of Assessment Done</label>
                                       
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        <label htmlFor='assessmentCompletionTime' className='form-label mb-1'>Completion Duration (in hours)</label>
                                      
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        <label htmlFor='scoreAchievedInQuiz' className='form-label mb-1'>Score Achieved in Quiz</label>
                                      
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        <label htmlFor='quizPassedOrFailed' className='form-label mb-1'>Quiz Passed    or Failed</label>
                                       
                                    </MDBCol>
                </MDBRow>
                <MDBRow>
                {matchedUsers.map(users => (
        <MDBRow col='1' key={users.userId}>
                                    <MDBCol col='1'>
                                        <MDBInput id='trainingName' type='text' wrapperClass='mb-4' name='trainingName' value={users ? users.trainingName : ''} />
                                    </MDBCol>
                                    <MDBCol col='1'>
                                       
                                        <MDBInput id='trainerName' type='text' wrapperClass='mb-4' name='trainerName' value={users ? users.trainerName : ''} />
                                    </MDBCol>
                                    <MDBCol col='1'>
                                     
                                        <MDBInput id='optimizedDuration' type='text' wrapperClass='mb-4' name='optimizedDuration' value={users ? users.optimizedDuration : ''} />
                                    </MDBCol>
                                    <MDBCol col='1'>
                                       
                                        <MDBInput id='trainingStatus' type='text' wrapperClass='mb-4' name='trainingStatus' value={users ? users.trainingStatus : ''} />
                                    </MDBCol>
                                
                               
                                    <MDBCol col='1'>
                                       
                                        <MDBInput id='assessmentPercentageDone' type='text' wrapperClass='mb-4' name='assessmentPercentageDone' value={users ? users.assessment_percentage_done : ''} />
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        
                                        <MDBInput id='assessmentCompletionTime' type='text' wrapperClass='mb-4' name='assessmentCompletionTime' value={users ? users.assessment_completion_time_in_hours : ''} />
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        
                                        <MDBInput id='scoreAchievedInQuiz' type='text' wrapperClass='mb-4' name='scoreAchievedInQuiz' value={users ? users.scoreAchievedInQuiz : ''} />
                                    </MDBCol>
                                    <MDBCol col='1'>
                                        
                                        <MDBInput id='quizPassedOrFailed' type='text' wrapperClass='mb-4' name='quizPassedOrFailed' value={users ? users.quizPassedOrFailed : ''} />
                                    </MDBCol>
                                    </MDBRow>
    ))}
                </MDBRow>
                                
              </form>
            </MDBCardBody>
            
          </MDBCard>
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        )}
    </>
    );
};

export default UserProfile;
