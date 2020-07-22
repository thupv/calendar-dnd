import React, {useRef} from 'react';
import WorkoutContainer from "../WorkOutContainer";
import './index.scss';
import NewWorkout from "../NewWorkout";
import PropTypes from 'prop-types';
import {formatDayOfMonth, formatDayOfWeek, isToday, normalizeDate} from "../../utils/datetime.utils";
import {useSetRecoilState} from "recoil";
import {calendarState} from "../../recoil/atoms/calendar";
import {useDrop} from "react-dnd";
import DRAG_DROP_ITEM_TYPE from "../../constants/dnd.constants";
import {moveWorkoutState} from "../../recoil/selectors/workoutSelectors";
import {useRecoilValue} from "recoil";

const DayPlan = ({date}) => {
  const calendar = useRecoilValue(calendarState);
  const currentDatePlan = calendar[normalizeDate(date)] || [];
  const moveWorkout = useSetRecoilState(moveWorkoutState);
  const todayStyle = isToday(date) && 'today'

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: DRAG_DROP_ITEM_TYPE.WORKOUT,
    hover(item, monitor) {
      if (currentDatePlan.length > 0) return;
      if(item.date === date) return;
      moveWorkout({fromDate: normalizeDate(item.date), fromIdx: item.index, toDate: normalizeDate(date), toIdx: 0});
      item.index = 0;
      item.date = date;
    },
  });
  drop(ref);

  return <div className='dayplan'>
    <div className='title'>
      {formatDayOfWeek(date)}
    </div>
    <div className='content' ref={ref}>
      <div className={'day-of-month ' + todayStyle}>
        {formatDayOfMonth(date)}
      </div>
      <div className='plan-container'>
        {
          currentDatePlan.map((workout, index) => {
            return <WorkoutContainer workout={workout} workoutIdx={index} date={date} key={workout.uuid}/>
          })
        }
      </div>
      <div className='dayplan__add-workout'>
        <NewWorkout date={date}/>
      </div>
    </div>
  </div>
}

DayPlan.propTypes = {
  date: PropTypes.object
};

export default DayPlan;
