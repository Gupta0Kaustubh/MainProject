import React, { useEffect, useState } from 'react';
import Navbar from '../navbars/EmpNavbar';
import EventCalender from '../calendar/EventCalender';
import { Button, DialogActions, DialogContent, DialogContentText, Stack } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard({empCheck, setEmpCheck}) {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {

    if (!empCheck) {
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
          
          return {
            id: training._id,
            startDate: new Date(training.startDate), 
            endDate: new Date(training.endDate), 
            popupContent: (
              <>
                <DialogContent>
                  <DialogContentText id={`alert-dialog-description-${training._id}`}>
                    {training.trainingDescription}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus>OK</Button>
                </DialogActions>
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
      <Navbar setEmpCheck={setEmpCheck} />
      <Stack width='100%' minHeight='100vh' justifyContent='center'>
        <EventCalender data={data} onDataChange={setData} />
      </Stack>
    </>
  );
}

export default EmployeeDashboard;
