import {
    LATEST_SCORE_UPDATED_SUCCESS,
    LATEST_SCORE_UPDATED_FAILURE
} from './quiz.action.types';
import DataCallApi from '../../utils/api'


const updateLeaderBoard = (emailId, quizObj) => dispatch => {
    DataCallApi.updateLeaderBoard(emailId,quizObj)
    .then(resp => {
        dispatch({
            type: LATEST_SCORE_UPDATED_SUCCESS,
            payload: resp
        })
    }).catch(err => {
        dispatch({
            type: LATEST_SCORE_UPDATED_FAILURE,
            payload: err
        })
    })
    
}

export {
    updateLeaderBoard
}


