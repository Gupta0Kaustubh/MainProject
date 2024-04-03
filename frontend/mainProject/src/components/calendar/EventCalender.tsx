import React from 'react'
import { Paper, Grid } from '@mui/material'
import Controls from './Controls'
import useEventCalendar from '../Hooks/useEventCalendar'

const EventCalender = () => {
  const {changeMonth, date, daysGrid} = useEventCalendar()
    return <Paper sx={{width: '100%', border: '1px solid rgba(0,0,0,0.12)'}}>
      <Controls changeMonth={changeMonth} date={date} />
      <Grid container>
        
      </Grid>
  </Paper>
}

export default EventCalender