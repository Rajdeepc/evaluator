import {
    LATEST_SCORE_UPDATED_SUCCESS,
    LATEST_SCORE_UPDATED_FAILURE,
    GET_LEADERBOARD_LIST_FAILURE,
    GET_LEADERBOARD_LIST_SUCCESS
} from './quiz.action.types';
import DataCallApi from '../../utils/api'


const updateLeaderBoard = (emailId, profileObj, quizObj) => dispatch => {
    DataCallApi.updateLeaderBoard(emailId,profileObj,quizObj)
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


const getLeaderBoardList = () => dispatch => {
    DataCallApi.getLeaderBoardList()
    .then(resp => {
        dispatch({
            type: GET_LEADERBOARD_LIST_SUCCESS,
            payload: resp
        })
    }).catch(err => {
        dispatch({
            type: GET_LEADERBOARD_LIST_FAILURE,
            payload: err
        })
    })
}

export {
    updateLeaderBoard,
    getLeaderBoardList
}


