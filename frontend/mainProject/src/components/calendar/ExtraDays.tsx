import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
    daysGridLength: number;
    i: number;
}

const ExtraDays: FC<Props> = ({ daysGridLength, i }) => {
    const getWeekDays = () => [
        'MON.',
        'TUE.',
        'WED.',
        'THU.',
        'FRI.',
        'SAT.',
        'SUN.',
    ];

    const weekdays = getWeekDays();

    const shouldApplyBottomBorder = !(i > 7 * Math.floor(daysGridLength / 7) - 1);
    const shouldApplyLeftBorder = i % 7 !== 0;

    return (
        <Grid
            item
            height='8rem'
            textAlign='center'
            width={`${100 / 7}%`}
            border='none'
            borderBottom={shouldApplyBottomBorder ? '1px solid rgb(0,0,0,0.12)' : 'none'}
            borderLeft={shouldApplyLeftBorder ? '1px solid rgb(0,0,0,0.12)' : 'none'}
        >
            {i < 7 && (
                <Typography variant='caption' gutterBottom color='rgb(0,0,0,0.4)'>
                    {weekdays[i]}
                </Typography>
            )}
        </Grid>
    );
};

export default ExtraDays;
