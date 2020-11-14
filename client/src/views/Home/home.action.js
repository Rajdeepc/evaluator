// import { 
//     POST_LIKECOUNT_FAILURE,
//     POST_LIKECOUNT_SUCCESS,
//     GET_DATA_SUCCESS, 
//     GET_DATA_FAILURE,
//     POST_COMMENT_FAILURE,
//     POST_COMMENT_SUCCESS,
//     GET_COMMENTS_FAILURE,
//     GET_COMMENTS_SUCCESS,
//     GET_SEARCH_FAILURE,
//     GET_SEARCH_SUCCESS,
//     SUBTOPIC_DETAILS_ERROR,
//     SUBTOPIC_DETAILS_SUCCESS,
//     GET_SORTED_ITEM_DATE_FAILURE,
//     GET_SORTED_ITEM_DATE_SUCCESS,
//     GET_SORTED_ITEM_LIKES_FAILURE,
//     GET_SORTED_ITEM_LIKES_SUCCESS
// } from './home.types';
// import DataCallApi from '../../utils/services'


// const getApiDataByTopic = (topic_name) => dispatch => {
//     DataCallApi.getCallTogetData(topic_name)
//     .then(data => {
//         if(data.error) {
//             dispatch({
//                 type:GET_DATA_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: GET_DATA_SUCCESS,
//                 payload: {
//                     itemsByTopic:data
//                 }
//             })
//         }
//     })
// }


// const getSubTopicDetailsAction = (subtopic_id) => dispatch => {
//     DataCallApi.getCallSubTopicDetails(subtopic_id)
//     .then(data => {
//         if(data.error){
//             dispatch({
//                 type: SUBTOPIC_DETAILS_ERROR,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: SUBTOPIC_DETAILS_SUCCESS,
//                 payload: {
//                     itemDetails: data[0]
//                 }
//             })
//         }
//     })
// }



// const postCommentAction = (subtopic_id, comment_desc, name,email, provider_pic,date_updated) => dispatch => {
//     const body = {
//         comment_desc: comment_desc,
//         name:name,
//         email: email,
//         provider_pic:provider_pic,
//         date_updated:date_updated
//       };
//     DataCallApi.postCommentData(subtopic_id,body)
//     .then(data => {
//         if(data.error) {
//             dispatch({
//                 type:POST_COMMENT_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: POST_COMMENT_SUCCESS,
//                 payload: data
//             })
//         }
//     })
// }

// const getCommentsBySubtopic = (subtopic_id,topic_name,snippet) => dispatch => {
//     DataCallApi.getAllCommentsBySubTopic(subtopic_id,topic_name,snippet)
//     .then(data => {
//         if(data.error){
//             dispatch({
//                 type: GET_COMMENTS_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: GET_COMMENTS_SUCCESS,
//                 payload: data
//             })
//         }
        
//     })
// }


// const updateToPostLike = (subtopic_id,count) => dispatch => {
//     DataCallApi.updateLikeDataCall(subtopic_id,count)
//     .then(data => {
//         if(data.error){
//             dispatch({
//                 type: POST_LIKECOUNT_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch ({
//                 type:POST_LIKECOUNT_SUCCESS,
//                 payload: data
//             })
//         }
//     }) 
// }


// const searchAction = (topic_name, subtopic_title) => dispatch => {
//     DataCallApi.searchItems(topic_name,subtopic_title)
//     .then(data => {
//         if(data.error) {
//             dispatch({
//                 type: GET_SEARCH_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: GET_SEARCH_SUCCESS,
//                 payload: data
//             })
//         }
//     })
// }

// const getSortedItemsByDate = (subtopic_name) => dispatch => {
//     DataCallApi.getSortedItemsByDate(subtopic_name)
//     .then(data => {
//         if(data.error){
//             dispatch({
//                 type: GET_SORTED_ITEM_DATE_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: GET_SORTED_ITEM_DATE_SUCCESS,
//                 payload: data
//             })
//         }
//     })
// }

// const getSortedItemsByLikes = (subtopic_name) => dispatch => {
//     DataCallApi.getItemsByLikes(subtopic_name)
//     .then(data => {
//         if(data.error){
//             dispatch({
//                 type: GET_SORTED_ITEM_LIKES_FAILURE,
//                 payload: data.error
//             })
//         } else {
//             dispatch({
//                 type: GET_SORTED_ITEM_LIKES_SUCCESS,
//                 payload: data
//             })
//         }
//     })
// }



// export { 
//     getApiDataByTopic, 
//     postCommentAction,
//     getCommentsBySubtopic,
//     updateToPostLike,
//     searchAction,
//     getSubTopicDetailsAction,
//     getSortedItemsByDate,
//     getSortedItemsByLikes
//  };