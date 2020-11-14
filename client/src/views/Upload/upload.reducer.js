import {
  UPDATE_CART_SAVE_FAILURE,
  UPDATE_CART_SAVE_SUCCESS,
} from '../Upload/upload.types';

const INITIAL_STATE = {
  uploadDetails: [],
  updateSuccess: null,
  uploadDetailsError: {}
};

const UploadDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CART_SAVE_SUCCESS:
      return {
        updateSuccess: true,
        uploadDetails: action.payload
      };
    case UPDATE_CART_SAVE_FAILURE:
      return {
        updateSuccess: false,
        uploadDetailsError: action.payload
      };
    default:
      return state;
  }
};
export default UploadDetailsReducer;