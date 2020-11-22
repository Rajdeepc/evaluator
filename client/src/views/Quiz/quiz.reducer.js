import {
    LATEST_SCORE_UPDATED_SUCCESS,
    LATEST_SCORE_UPDATED_FAILURE
} from './quiz.action.types';

const INITIAL_STATE = {
    errorObj: {},
    updateSuccess: false
}

const QuizLeaderBoardReducer = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        case LATEST_SCORE_UPDATED_SUCCESS:
            return {
                ...state,
                updateSuccess: true
            }
        case LATEST_SCORE_UPDATED_FAILURE:
            return {
                ...state,
                updateSuccess: false,
                errorObj: action.payload.error
            }
            default:
                return state
    }
}

export default QuizLeaderBoardReducer;