import React, { useEffect, useState } from 'react';
import Navbar from '../navbars/EmpNavbar';

import {  Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import '../styles/buttonStyle.css'

import ChartEmp from '../ChartEmp';

function EmployeeDashboard({empCheck, setEmpCheck}) {
  const navigate = useNavigate()

  useEffect(() => {

    if (!empCheck) {
      navigate('/')
    }
   
  }, []);

  return (
    <>
      <Navbar setEmpCheck={setEmpCheck} />
      <Stack width='100%' minHeight='100vh' justifyContent='center'>
      <ChartEmp />
      </Stack>
    </>
  );
}

export default EmployeeDashboard;
