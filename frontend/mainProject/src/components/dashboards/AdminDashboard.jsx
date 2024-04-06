import React from 'react'
import Navbar from '../navbars/Navbar'

function AdminDashboard({adminCheck, setAdminCheck}) {
  return (
    <>
      <Navbar setAdminCheck={setAdminCheck} />
      <div>AdminDashboard</div>
      </>
  )
}

export default AdminDashboard