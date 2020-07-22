import React, {Fragment, useState} from 'react';
import './index.scss';
import {normalizeDate} from "../../utils/datetime.utils";
import {useSetRecoilState} from "recoil";
import {newExerciseState} from "../../recoil/selectors/exerciseSelectors";
import PropTypes from "prop-types";
import NewWorkout from "../NewWorkout";

const NewExercise = ({date, workoutIdx}) => {
  const [isShowNewExerciseForm, setIsShowNewExerciseForm] = useState(false);

  const initialFormState = {
    name: 'Exercise E',
    information: '50 lb x 5',
    sets: 1,
  };

  const toggleShowExercise = () => {
    setIsShowNewExerciseForm(!isShowNewExerciseForm);
  }
  const [formState, setFormState] = useState(initialFormState);
  const addExerciseState = useSetRecoilState(newExerciseState);

  const onFormChange = (name) => (e) => {
    setFormState({...formState, [name]: e.target.value});
  }

  const addNewExercise = () => {
    setFormState(initialFormState);
    toggleShowExercise();
    addExerciseState({
      ...formState,
      date: normalizeDate(date),
      workoutIdx
    })
  }

  return <Fragment>
    {!isShowNewExerciseForm && <div className='workout-container__add' onClick={toggleShowExercise}>
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle-fill" fill="currentColor">
        <path fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
      </svg>
    </div>}
    {isShowNewExerciseForm && <div className='new_exercise'>
      <input type='text' className='name' placeholder='Type new exercise name' value={formState.name}
             onChange={onFormChange('name')}/>
      <div className='exercise__content'>
      <span>
        X
      </span>
        <input type='number' className='sets' placeholder='sets' value={formState.sets}
               onChange={onFormChange('sets')}/>
        <input type='text' className='info' placeholder='information' value={formState.information}
               onChange={onFormChange('information')}/>
      </div>
      <div className='new_exercise_footer'>
        <div className='new_exercise-form-submit button-primary' onClick={addNewExercise}>
          Add
        </div>
        <div className='new_exercise-form-close button-cancel' onClick={toggleShowExercise}>
          <svg width="1em" height="1em" viewBox="0 0 12 12" className="bi bi-x" fill="currentColor">
            <path fillRule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fillRule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
          </svg>
        </div>
      </div>
    </div>}

  </Fragment>
}

NewWorkout.propTypes = {
  date: PropTypes.object,
  workoutIdx: PropTypes.number
};

export default NewExercise;
