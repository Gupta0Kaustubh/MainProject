import { Dialog, DialogTitle, Grid, Typography } from '@mui/material'
import React, {FC, useState} from 'react'
import { Event as EventType } from './types/EventCalendarTypes'

interface Props {
    event: EventType
    i: number
}

const Event: FC<Props> = ({event, i}) => {

  const [showDialog, setShowDialog] = useState(false)

  return <Grid item xs={12} sm={6} md={4} lg={12}>
    <Typography variant='caption' component='div' sx={{
      marginY: '0.9em',
      backgroundColor: event.color ?? '#00b4d8',
      color: event.color == 'black' ? 'white' : 'black',
      cursor: 'pointer',
      borderRadius: '5px',
      height: '3rem',
      paddingY: '0.4em',
      marginX: '0.5em',
    }}
    onClick={() => setShowDialog(true)}
    >
      {event.title}
    </Typography>
    <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
      <DialogTitle>{event.title}</DialogTitle>
      {event.popupContent}
    </Dialog>
  </Grid>
}

export default Event