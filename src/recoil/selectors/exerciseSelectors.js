import {calendarState} from "../atoms/calendar";
import {selector} from "recoil";
import {deepClone} from "../../utils/obj.utils";
import {generateUUID} from "../../utils/uuid.utils";

export const newExerciseState = selector({
  key: 'NewExercise',
  set: ({set, get}, newExercise) => {
    let newCalendarState = JSON.parse(JSON.stringify(get(calendarState)));
    newCalendarState[newExercise.date][newExercise.workoutIdx].exercises.push({
      ...newExercise, uuid: generateUUID()
    })
    set(calendarState, {...newCalendarState})
  },
});

export const moveExerciseState = selector({
  key: 'MoveExercise',
  set: ({set, get}, {fromDate, fromWorkoutIdx, fromIdx, toDate, toWorkoutIdx, toIdx}) => {
    let newCalendarState = deepClone(get(calendarState));
    const item = newCalendarState[fromDate][fromWorkoutIdx].exercises[fromIdx];
    newCalendarState[fromDate][fromWorkoutIdx].exercises = newCalendarState[fromDate][fromWorkoutIdx].exercises.filter((i, idx) => idx !== fromIdx);
    newCalendarState[toDate][toWorkoutIdx].exercises = newCalendarState[toDate][toWorkoutIdx].exercises || [];
    newCalendarState[toDate][toWorkoutIdx].exercises.splice(toIdx, 0, item);
    set(calendarState, {...newCalendarState})
  },
});

