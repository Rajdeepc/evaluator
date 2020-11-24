import {
  LATEST_SCORE_UPDATED_SUCCESS,
  LATEST_SCORE_UPDATED_FAILURE,
  GET_LEADERBOARD_LIST_FAILURE,
  GET_LEADERBOARD_LIST_SUCCESS,
} from "./quiz.action.types";

const INITIAL_STATE = {
  errorObj: {},
  updateSuccess: false,
  getLeaderBoardList:[]
};

const QuizLeaderBoardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LATEST_SCORE_UPDATED_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
      };
    case LATEST_SCORE_UPDATED_FAILURE:
      return {
        ...state,
        updateSuccess: false,
        errorObj: action.payload.error,
      };
    case GET_LEADERBOARD_LIST_SUCCESS:
      return {
        ...state,
        getLeaderBoardList: action.payload.leaderBoardList
      };
    case GET_LEADERBOARD_LIST_FAILURE:
      return {
        ...state,
        getLeaderBoardList: [],
        errorObj: action.payload.error,
      };
    default:
      return state;
  }
};

export default QuizLeaderBoardReducer;
