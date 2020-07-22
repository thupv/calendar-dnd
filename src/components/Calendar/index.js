import React from 'react';
import DayPlan from "../DayPlan";
import './index.scss';
import {getCurrentWeek} from "../../utils/datetime.utils";

const Calendar = () => {
  const currentWeek = getCurrentWeek();
  return <div className='calendar'>
    {
      currentWeek.map((date, index) => {
        return <DayPlan date={date} key={index}/>
      })
    }
  </div>
}

export default Calendar;
