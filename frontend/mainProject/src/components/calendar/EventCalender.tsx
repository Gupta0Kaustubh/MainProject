import React, { FC } from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import Controls from './Controls'
import useEventCalendar from './Hooks/useEventCalendar'
import Day from './Day'
import ExtraDays from './ExtraDays'
import { EventsData } from './types/EventCalendarTypes'

interface Props{
  data: EventsData
  onDataChange?: (events: EventsData) => void
}

const EventCalender: FC<Props> = ({data, onDataChange}) => {

  const {changeMonth, date, daysGrid} = useEventCalendar()
    return <Paper sx={{width: '100%', border: '1px solid rgba(0,0,0,0.12)'}}>
      <Controls changeMonth={changeMonth} date={date} />
      <Grid container>
        {daysGrid.map((item, i) => item?.no ? 
        <Day key={i} daysGridLength={daysGrid.length} events={data.filter(d => item.date.isSame(d.startDate, 'day') || (item.date.isAfter(d.startDate, 'day') && item.date.isBefore(d.endDate, 'day')) || item.date.isSame(d.endDate, 'day'))} i={i} item={item} />
         : <ExtraDays key={i} daysGridLength={daysGrid.length} i={i} />
          )}
      </Grid>
  </Paper>
}

export default EventCalender