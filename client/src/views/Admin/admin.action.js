import DataCallApi from '../../utils/api';
import { 
        REVIEW_ITEMS_SUCCESS,
    REVIEW_ITEMS_FAILURE,
    UPDATE_UPLOAD_STATUS_FAILURE,
    UPDATE_UPLOAD_STATUS_SUCCESS

 } from './admin.types';

const getInReviewData = (status) => dispatch => {
    DataCallApi.getInReviewItems(status)
        .then(data => {
            if (data.error) {
                dispatch({
                    type: REVIEW_ITEMS_FAILURE,
                    payload: data.error
                })
            } else {
                dispatch({
                    type: REVIEW_ITEMS_SUCCESS,
                    payload: data
                })
            }
        })
}


const updateUploadStatus = (id,uploadStatus,question,answer) => dispatch => {
    DataCallApi.updateAcceptItem(id,uploadStatus,question,answer)
    .then(data => {
        if(data.error) {
            dispatch({
                type: UPDATE_UPLOAD_STATUS_FAILURE,
                payload: data.error
            })
        } else {
            dispatch({
                type: UPDATE_UPLOAD_STATUS_SUCCESS,
                payload: data
            })
        }
    })
}


export { getInReviewData,updateUploadStatus }