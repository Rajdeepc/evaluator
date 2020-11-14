
// import DataCallApi from '../../utils/services'
// import {
//     GET_UPLOADED_STATUS_FAILURE,
//     GET_UPLOADED_STATUS_SUCCESS,
//     APPROVED_STATUS_SUCCESS
//  } from './myprofile.types';


// const getDataByUploadedStatus = (keyCode,email_id) => dispatch => {
//     let status = '';
//     let type = '';
//     if(keyCode === "1") {
//         status = 'Approved'
//         type = APPROVED_STATUS_SUCCESS
//     }
//     if(keyCode === "2") {
//         status = 'InReview'
//         type = GET_UPLOADED_STATUS_SUCCESS
//     }
//     if(keyCode === "3") {
//         status = 'Rejected'
//         type = GET_UPLOADED_STATUS_SUCCESS
//     }
//     DataCallApi.getUploadedStatusData(status,email_id)
//     .then(data => {
//         if(data.error) {
//             dispatch({
//                 type: GET_UPLOADED_STATUS_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: type,
//                 payload:data
//             })
//         }
//     })
// }

// export { getDataByUploadedStatus };