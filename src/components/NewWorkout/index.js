import React, {useState} from 'react';
import './index.scss';
import {newWorkoutState} from "../../recoil/selectors/workoutSelectors";
import PropTypes from "prop-types";
import {normalizeDate} from "../../utils/datetime.utils";
import {useSetRecoilState} from "recoil";

const NewWorkout = ({date}) => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const addWorkoutState = useSetRecoilState(newWorkoutState);

  const toggleShowForm = () => {
    setIsShowForm(!isShowForm);
  }

  const addWorkout = () => {
    if (!newWorkoutName) return;
    const newWorkoutObj = {
      date: normalizeDate(date),
      name: newWorkoutName
    };
    addWorkoutState(newWorkoutObj);
    setIsShowForm(false);
    setNewWorkoutName('');
  }

  const onChangeNewWorkoutName = (e) => {
    setNewWorkoutName(e.target.value);
  }

  return <div className='add-workout'>
    {!isShowForm && <div className='add-workout-placeholder' onClick={toggleShowForm}>
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor">
        <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
        <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
      </svg>
      <span className='new-workout-text'>Add new work out</span>
    </div>}
    {isShowForm && <div className='add-workout-form'>
      <input type='text' placeholder='Type your workout name' value={newWorkoutName} onChange={onChangeNewWorkoutName}/>
      <div className='add-workout-form__footer'>
        <div className='add-workout-form-submit button-primary' onClick={addWorkout}>
          Add
        </div>
        <div className='add-workout-form-close button-cancel' onClick={toggleShowForm}>
          <svg width="1em" height="1em" viewBox="0 0 12 12" className="bi bi-x" fill="currentColor">
            <path fillRule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fillRule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
          </svg>
        </div>
      </div>
    </div>}
  </div>
}

NewWorkout.propTypes = {
  date: PropTypes.object
};
export default NewWorkout;
