import React, { useEffect, useState } from 'react';
import Navbar from '../navbars/EmpNavbar';

import {  Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import '../styles/buttonStyle.css'

import ChartEmp from '../ChartEmp';

function EmployeeDashboard({setIsLoggedIn}) {
  const navigate = useNavigate()


  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <Stack width='100%' minHeight='100vh' justifyContent='center'>
      <ChartEmp />
      </Stack>
    </>
  );
}

export default EmployeeDashboard;
