import React, {useRef} from 'react';
import './index.scss';
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import DRAG_DROP_ITEM_TYPE from "../../constants/dnd.constants";
import {normalizeDate} from "../../utils/datetime.utils";
import {useSetRecoilState} from "recoil";
import {moveExerciseState} from "../../recoil/selectors/exerciseSelectors";

const Exercise = ({exercise, index, date, workoutIdx}) => {
  const ref = useRef(null);
  const moveExercise = useSetRecoilState(moveExerciseState);

  const [, drop] = useDrop({
    accept: DRAG_DROP_ITEM_TYPE.EXERCISE,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && date === item.date) return;

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveExercise({fromDate: normalizeDate(item.date),
        fromWorkoutIdx: item.workoutIdx,
        fromIdx: dragIndex,
        toDate: normalizeDate(date),
        toWorkoutIdx: workoutIdx,
        toIdx: hoverIndex
      });
      item.index = hoverIndex;
      item.date = date;
      item.workoutIdx = workoutIdx;
    },
  });

  const [{isDragging}, drag] = useDrag({
    item: {type: DRAG_DROP_ITEM_TYPE.EXERCISE, workoutIdx, exercise, date, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));

  return <div className='exercise' style={{opacity: isDragging ? 0 : 1}} ref={ref}>
    <div className='name'>{exercise.name}</div>
    <div className='exercise__content'>
      <div className='sets'>x{exercise.sets}</div>
      <div className='info'>{exercise.information}</div>
    </div>
  </div>
}

Exercise.propTypes = {
  exercise: PropTypes.object,
  index: PropTypes.number,
  date: PropTypes.object,
  workoutIdx: PropTypes.number
};

export default Exercise;
