import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styles/buttonStyle.css'


const ChartEmp = () => {
  return (
    <div className="chart-admin-container mt-4 " style={{ overflow: 'hidden' }}>
  <iframe
    title="BI"
    width="71%"
    height="580x" /* Adjust height as needed */
    src="https://app.powerbi.com/reportEmbed?reportId=c7270f77-0f2a-474d-8961-1dbfed4e357f&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99&navContentPaneEnabled=false&filterPaneEnabled=false&config=reportLevelSettings.background.type:none"
    frameBorder="0"
    allowFullScreen={true}
    style={{ border: 'none' }} /* Remove iframe border */
    className='bi1'
  ></iframe>
</div>
  )
}

export default ChartEmp