import React, { useEffect, useState } from 'react';
import Navbar from '../navbars/EmpNavbar';
import EventCalender from '../calendar/EventCalender';
import { Button, DialogActions, DialogContent, DialogContentText, Stack } from '@mui/material';
import moment from 'moment';

function EmployeeDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
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
          const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
          
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
      <Navbar />
      <Stack width='100%' minHeight='100vh' justifyContent='center'>
        <EventCalender data={data} onDataChange={setData} />
      </Stack>
    </>
  );
}

export default EmployeeDashboard;
