import React, { useEffect } from 'react'
import Navbar from '../navbars/Navbar'
import ChartAdmin from '../ChartAdmin'
import { useNavigate } from 'react-router-dom'

function AdminDashboard({setIsLoggedIn}) {

  const navigate = useNavigate()

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <ChartAdmin />
      </>
  )
}

export default AdminDashboard