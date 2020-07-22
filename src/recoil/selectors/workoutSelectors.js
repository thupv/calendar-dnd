import {calendarState} from "../atoms/calendar";
import {selector} from "recoil";
import {generateUUID} from "../../utils/uuid.utils";
import {deepClone} from "../../utils/obj.utils";

export const newWorkoutState = selector({
  key: 'NewWorkout',
  set: ({set, get}, {date, name}) => {
    let newCalendarState = deepClone(get(calendarState));
    newCalendarState[date] = newCalendarState[date] || [];
    newCalendarState[date] = [...newCalendarState[date], {
      name: name,
      uuid: generateUUID(),
      exercises: []
    }];
    set(calendarState, newCalendarState)
  },
});

export const moveWorkoutState = selector({
  key: 'MoveWorkout',
  set: ({set, get}, {fromDate, fromIdx, toDate, toIdx}) => {
    let newCalendarState = deepClone(get(calendarState));
    const item = newCalendarState[fromDate][fromIdx];
    newCalendarState[fromDate] = newCalendarState[fromDate].filter((i, idx) => idx !== fromIdx);
    newCalendarState[toDate] = newCalendarState[toDate] || [];
    newCalendarState[toDate].splice(toIdx, 0, item);
    set(calendarState, {...newCalendarState})
  },
});
