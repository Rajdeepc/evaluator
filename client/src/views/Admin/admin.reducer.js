import {
  REVIEW_ITEMS_SUCCESS,
  REVIEW_ITEMS_FAILURE,
  UPDATE_UPLOAD_STATUS_FAILURE,
  UPDATE_UPLOAD_STATUS_SUCCESS,
} from "./admin.types";

const INITIAL_STATE = {
  allReviewItems: [],
  errorObj: {},
};

const AdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REVIEW_ITEMS_SUCCESS:
    case UPDATE_UPLOAD_STATUS_SUCCESS:
      return {
        ...state,
        allReviewItems: action.payload.reviewItems
      };
    case REVIEW_ITEMS_FAILURE:
      return {
        ...state,
        errorObj: action.payload,
      };
    case UPDATE_UPLOAD_STATUS_FAILURE:
      return {
        ...state,
        errorObj: action.payload
      };
    default:
      return state;
  }
};

export default AdminReducer;
