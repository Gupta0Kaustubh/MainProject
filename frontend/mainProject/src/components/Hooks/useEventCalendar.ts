import { useEffect, useState } from 'react'
import moment from 'moment'

export default function useEventCalendar() {
    const [date, setDate] = useState(moment())
    const [daysGrid, setDaysGrid] = useState<Array<any>>([])

    useEffect(() => getMonthDaysGrid(), [date])

    const getMonthDaysGrid = () => {
        let totalNextMonthStartDays: number;
        const firstDayOfMonth = date.clone().startOf('month')
        const lastDayOfMonth = date.clone().endOf('month')
        
        const lastDayOfMonthDays = lastDayOfMonth.days()

        const totalLastMonthFinalDays = firstDayOfMonth.days() - 1 < 0 ? 6 : firstDayOfMonth.days() - 1
        if (lastDayOfMonthDays === 1) totalNextMonthStartDays = 6
        else if (lastDayOfMonthDays === 2) totalNextMonthStartDays = 5
        else if (lastDayOfMonthDays === 3) totalNextMonthStartDays = 4
        else if (lastDayOfMonthDays === 4) totalNextMonthStartDays = 3
        else if (lastDayOfMonthDays === 5) totalNextMonthStartDays = 2
        else if (lastDayOfMonthDays === 6) totalNextMonthStartDays = 1
        else totalNextMonthStartDays = 0

        const totalDays = date.daysInMonth() + totalLastMonthFinalDays + totalNextMonthStartDays
        const monthList: Array<any> = Array.from({ length: totalDays })
        let counter = 1

        for (let i = totalLastMonthFinalDays; i < totalDays; i++){
            if(i < totalDays - totalNextMonthStartDays) {
                monthList[i] = {
                    no: counter,
                    date: date.clone().startOf('month').add(counter-1, 'days')
                }
                counter++;
            } 
            setDaysGrid(monthList)
        }
    }

    const changeMonth = (action: 'add' | 'subtract') => {
        if (action === 'add') setDate(prevDate => prevDate.clone().add(1, 'months'))
        else if(action === 'subtract') setDate(prevDate => prevDate.clone().subtract(1, 'months'))
    }

    return {date, changeMonth, daysGrid }
}