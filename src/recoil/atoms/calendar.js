import {atom} from "recoil";
import {normalizeDate} from "../../utils/datetime.utils";
import moment from "moment";
import {generateUUID} from "../../utils/uuid.utils";

const initialState = {};
//ONLY FOR TESTING----------------------
initialState[normalizeDate(moment())] = [
  {
    name: 'workout number 1 workout number 1',
    uuid: generateUUID(),
    exercises: [
      {
        name: 'exercise1',
        sets: 3,
        information: '50 lb x 5',
        uuid: generateUUID(),
      },
      {
        name: 'exercise2',
        sets: 1,
        information: '50 lb x 5',
        uuid: generateUUID(),
      },
      {
        name: 'exercise3',
        sets: 2,
        information: '50 lb x 5',
        uuid: generateUUID(),
      },
      {
        name: 'exercise4',
        sets: 4,
        information: '50 lb x 5',
        uuid: generateUUID(),
      }
    ]
  },
  {
    name: 'workout number 2',
    uuid: generateUUID(),
    exercises: [
      {
        name: 'exercise 1 exercise 1 exercise 1 exercise 1 exercise 1 exercise 1',
        sets: 1,
        information: '50 lb x 5',
        uuid: generateUUID(),
      },
      {
        name: 'exercise2',
        sets: 1,
        information: '50 lb x 5',
        uuid: generateUUID(),
      }
    ]
  }
];
//ONLY FOR TESTING-----------------------

export const calendarState = atom({
  key: 'calendar',
  default: initialState
});
