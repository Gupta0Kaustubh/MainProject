import React,{useState, useEffect} from 'react'
import Navbar from './navbars/Navbar';
import EventCalender from '../components/calendar/EventCalender'
import { Button, DialogActions, DialogContent, DialogContentText, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles/buttonStyle.css'

const AdminCalendar = ({adminCheck, setAdminCheck}) => {

  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!adminCheck) {
        navigate('/')
    }
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
    }, []);

  return (
    <>
      <Navbar setAdminCheck={setAdminCheck} />
      <Stack width='100%' minHeight='100vh' justifyContent='center'>
        <EventCalender data={data} onDataChange={setData} />
      </Stack>
    </>
  )
}

export default AdminCalendar