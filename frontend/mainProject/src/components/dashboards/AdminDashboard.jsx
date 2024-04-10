import React, { useEffect } from 'react'
import Navbar from '../navbars/Navbar'
import ChartAdmin from '../ChartAdmin'
import { useNavigate } from 'react-router-dom'

function AdminDashboard({adminCheck, setAdminCheck}) {

  const navigate = useNavigate()

  useEffect(() => {
      if(!adminCheck){
        useNavigate('/')
      }
  }, [])
  return (
    <>
      <Navbar setAdminCheck={setAdminCheck} />
      <ChartAdmin />
      </>
  )
}

export default AdminDashboard