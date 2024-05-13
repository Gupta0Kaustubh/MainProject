import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './styles/buttonStyle.css'

const ChartAdmin = () => {

  return (
    <div className="chart-admin-container mt-4 " style={{ overflow: 'hidden' }}>
  <iframe
    title="BI"
    width="71%"
    height="585x" /* Adjust height as needed */
    src="https://app.powerbi.com/reportEmbed?reportId=19dc4ebd-74db-400a-ba30-791dccb12b7e&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99&navContentPaneEnabled=false&filterPaneEnabled=false&config=reportLevelSettings.background.type:none"
    frameBorder="0"
    allowFullScreen={true}
    style={{ border: 'none' }} /* Remove iframe border */
    className='bi'
  ></iframe>
</div>

  )
}

export default ChartAdmin