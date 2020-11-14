import DataCallApi from '../../utils/api'
import { RECEIVED_ALL_QUESTION_BY_TOPIC,
    FAILED_ALL_QUESTION_BY_TOPIC,
    RECEIVED_ALL_APPROVED_ITEMS,
    FAILED_ALL_APPROVED_ITEMS,
    LIKE_COUNT_INCREASE_SUCCESS,
  LIKE_COUNT_INCREASE_FAILED
} from './selectorbar.action.types'





const getAllQuestions = (topicValues) => dispatch => {
    DataCallApi.getQuestions(topicValues)
    .then(response => {
        dispatch({
            type: RECEIVED_ALL_QUESTION_BY_TOPIC,
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: FAILED_ALL_QUESTION_BY_TOPIC,
            payload: error
        })
    })
}


const getAllApprovedItems = () => dispatch => {
    DataCallApi.getAllApprovedItems()
    .then(response => {
        dispatch({
            type: RECEIVED_ALL_APPROVED_ITEMS,
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: FAILED_ALL_APPROVED_ITEMS,
            payload: error
        })
    })
}


const callActionToLike = (questionId) => (dispatch) => {
    DataCallApi.updateLikesCount(questionId)
      .then((response) => {
        if (response.success) {
          dispatch({
            type: LIKE_COUNT_INCREASE_SUCCESS,
            payload: response,
          });
        }
      })
      .catch((err) => {
        if (err) {
          dispatch({
            type: LIKE_COUNT_INCREASE_FAILED,
            payload: err,
          });
        }
      });
  };

export {
    getAllQuestions,
    callActionToLike,
    getAllApprovedItems
}