import React from 'react';
import {ACTIONS} from './Utils';

function DigitButton({dispatch, digit}) {
    return <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>
}

export default DigitButton;