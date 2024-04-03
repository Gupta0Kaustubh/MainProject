import React from 'react'
import Navbar from '../navbars/EmpNavbar'
import EventCalender from '../calendar/EventCalender'
import { Stack } from '@mui/material'

function EmployeeDashboard() {
  return (
    <>
      <Navbar />
      <div>EmployeeDashboard</div>
      <Stack width='100%' minHeight='100vh' justifyContent='center'>
        <EventCalender />
      </Stack>
      
      </>
  )
}

export default EmployeeDashboard
