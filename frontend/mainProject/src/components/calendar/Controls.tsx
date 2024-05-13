import { IconButton, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import moment, {Moment} from 'moment'
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material'
import Button from '@mui/material/Button';

interface Props { 
    changeMonth: (action: 'add' | 'subtract') => void;
    date: Moment
}

const Controls: FC<Props> = ({changeMonth, date}) => {
    return (
        <Stack direction='row' alignItems='center' justifyContent='space-between' padding='0.5em 1em' borderBottom='1px solid rgba(0,0,0,0.12)'>
            <Stack direction='row' >
                <IconButton size='small' color='primary' onClick={() => changeMonth('subtract')}>
                    <ArrowBackIos />
                </IconButton>
                <IconButton size='small' color='primary' onClick={() => changeMonth('add')}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Typography>{date.format('MMMM, YYYY')}</Typography>
        </Stack>
    );
}

export default Controls