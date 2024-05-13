import React, { FC } from 'react';
import { DaysGrid, EventsData } from './types/EventCalendarTypes';
import { Grid, Typography, ThemeProvider } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@emotion/react';
import Event from './Event';

interface Props {
    i: number;
    daysGridLength: number;
    item: DaysGrid;
    events?: EventsData;
}

const Day: FC<Props> = ({ daysGridLength, i, item, events }) => {

    const theme = useTheme()

    const getWeekDays = () => [
        'MON.',
        'TUE.',
        'WED.',
        'THU.',
        'FRI.',
        'SAT.',
        'SUN.',
    ]

    const weekdays = getWeekDays();

    const isSameDate = moment().isSame(item.date, 'day')

    const shouldApplyBottomBorder = !(i > 7 * Math.floor(daysGridLength / 7) - 1);
    const shouldApplyLeftBorder = i % 7 !== 0;

    return (
        <ThemeProvider theme={theme}>
            <Grid item textAlign='center' height='8rem' overflow='auto' width={`${100 / 7}%`} borderTop='none' borderRight='none'
            paddingTop='0.3em'
            borderBottom={shouldApplyBottomBorder ? '1px solid rgb(0,0,0,0.12)' : 'none'}
            borderLeft={shouldApplyLeftBorder ? '1px solid rgb(0,0,0,0.12)' : 'none'}
        >
                {i < 7 && (
                    <>
                    <Typography variant='caption' gutterBottom color='rgb(0,0,0,0.8)'>
                        {weekdays[i]}
                    </Typography>
                    <br />
                    </>
                )}

                {/* Day no */}
                <Typography
                    variant='caption'
                    color={isSameDate ? 'black' : 'black'}
                    sx={{
                        backgroundColor: isSameDate ? '#00b4d8' : 'transparent',
                        borderRadius: '50%',
                        padding: '0.5em 0.7em',
                    }}
                    gutterBottom
                >
                    {item.no}
                </Typography>

                {/* Events Display */}
                    <Grid container>
                        {events?.map((e, i) => (
                        <Event key={e.id || i} event={e} i={i} />
                        ))}
                    </Grid>

            </Grid>
        </ThemeProvider>
    );
}

export default Day;
