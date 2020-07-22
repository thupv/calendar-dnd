import React, {useRef} from 'react';
import Exercise from "../Exercise";
import './index.scss';
import PropTypes from "prop-types";
import NewExercise from "../NewExercise";
import DRAG_DROP_ITEM_TYPE from "../../constants/dnd.constants";
import {useDrag, useDrop} from "react-dnd";
import {useSetRecoilState} from "recoil";
import {moveWorkoutState} from "../../recoil/selectors/workoutSelectors";
import {normalizeDate} from "../../utils/datetime.utils";
import {moveExerciseState} from "../../recoil/selectors/exerciseSelectors";

const WorkoutContainer = ({workout, workoutIdx, date}) => {
  const moveWorkout = useSetRecoilState(moveWorkoutState);
  const moveExercise = useSetRecoilState(moveExerciseState);

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: [DRAG_DROP_ITEM_TYPE.WORKOUT, DRAG_DROP_ITEM_TYPE.EXERCISE],
    hover(item, monitor) {
      if (item.type === DRAG_DROP_ITEM_TYPE.EXERCISE) {
        if (workout.exercises.length > 0) return;
        if(item.date === date && item.workoutIdx === workoutIdx) return;
        moveExercise({fromDate: normalizeDate(item.date),
          fromWorkoutIdx: item.workoutIdx,
          fromIdx: item.index,
          toDate: normalizeDate(date),
          toWorkoutIdx: workoutIdx,
          toIdx: 0
        });
        item.index = 0;
        item.date = date;
        return;
      }
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = workoutIdx;

      if (dragIndex === hoverIndex && date === item.date) return;

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveWorkout({
        fromDate: normalizeDate(item.date),
        fromIdx: dragIndex,
        toDate: normalizeDate(date),
        toIdx: hoverIndex
      });
      item.index = hoverIndex;
      item.date = date;
    },
  });

  const [{isDragging}, drag] = useDrag({
    item: {type: DRAG_DROP_ITEM_TYPE.WORKOUT, index: workoutIdx, workout, date},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));

  return <div className='workout-container' style={{opacity: isDragging ? 0 : 1}} ref={ref}>
    <div className='workout-container__head'>
      <div className='workout-container__title'>
        {workout.name}
      </div>
      <div className='workout-container__menu'>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots" fill="#C4C4C4">
          <path fillRule="evenodd"
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
      </div>
    </div>
    <div className='exercises-container'>
      {
        workout.exercises.map((exercise, index) => {
          return <Exercise exercise={exercise} date={date} workoutIdx={workoutIdx} index={index} key={exercise.uuid}/>
        })
      }
    </div>
    <div className='workout-container__footer'>
      <NewExercise workoutIdx={workoutIdx} date={date}/>
    </div>
  </div>
}

WorkoutContainer.propTypes = {
  workout: PropTypes.object,
  workoutIdx: PropTypes.number,
  date: PropTypes.object
};

export default WorkoutContainer;
