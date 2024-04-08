import React from 'react'
import Navbar from '../navbars/Navbar'
import ChartAdmin from '../ChartAdmin'

function AdminDashboard({adminCheck, setAdminCheck}) {
  return (
    <>
      <Navbar setAdminCheck={setAdminCheck} />
      <ChartAdmin />
      </>
  )
}

export default AdminDashboard