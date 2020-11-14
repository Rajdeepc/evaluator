import Service from '../../utils/api'
import {
  UPDATE_CART_SAVE_FAILURE,
  UPDATE_CART_SAVE_SUCCESS,
  CLEARED_SESSION_STORAGE
} from './upload.types';


const submitFormForUpload = (uploadObj) => dispatch => {

  Service.submitContent(uploadObj)
    .then(data => {
      if (data.error) {
        dispatch({
          type: UPDATE_CART_SAVE_FAILURE,
          payload: data.error
        })
      } else {
        dispatch({
          type: UPDATE_CART_SAVE_SUCCESS,
          payload: data
        });
      }
    });
};

const logOutSession = () => dispatch => {
  sessionStorage.clear();
  dispatch({
    type: CLEARED_SESSION_STORAGE
  })
}

export { submitFormForUpload,logOutSession };