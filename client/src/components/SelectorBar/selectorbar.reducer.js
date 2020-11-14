import {
  RECEIVED_ALL_QUESTION_BY_TOPIC,
  FAILED_ALL_QUESTION_BY_TOPIC,
  RECEIVED_ALL_APPROVED_ITEMS,
  FAILED_ALL_APPROVED_ITEMS,
  LIKE_COUNT_INCREASE_SUCCESS,
  LIKE_COUNT_INCREASE_FAILED
} from "./selectorbar.action.types";

const INITIAL_STATE = {
  allQuestionsByTopic: [],
  error: {},
  allApprovedItems: [],
};

const SelectorBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVED_ALL_QUESTION_BY_TOPIC:
      return {
        ...state,
        allQuestionsByTopic: action.payload.allQuestions,
      };
    case FAILED_ALL_QUESTION_BY_TOPIC:
      return {
        ...state,
        error: action.payload,
      };
    case RECEIVED_ALL_APPROVED_ITEMS:
      return {
        ...state,
        allApprovedItems: action.payload.allApprovedQuestions,
      };
    case FAILED_ALL_APPROVED_ITEMS:
      return {
        ...state,
        error: action.payload,
      };
    case LIKE_COUNT_INCREASE_SUCCESS:
      return {
        ...state,
        allQuestionsByTopic: action.payload.updatedItems
      };
    case LIKE_COUNT_INCREASE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SelectorBarReducer;
