import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "./environment";

/**
 * @method registerUser
 * @param {*} obj
 */
const submitContent = (submitObj) => {
  const body = {
    topic_name: submitObj.topicSelectValue || '',
    category_name: submitObj.category,
    question: submitObj.question,
    answer: submitObj.editorValue,
    uploadedby: submitObj.author_name,
    updated_date: submitObj.today_date,
    likes_count: 0,
    uploadStatus: "InReview",
    // comments: [],
    difficulty: submitObj.difficulty
  };
  const url = BASE_URL + API_ENDPOINTS.submitContent;
  return axios.post(url, body).then((response) => {
    return response.data;
  });
};


const getQuestions = (topicObj) => {
  const body = {
    topic_name: topicObj.selectedTopic,
    category_name: topicObj.selectedCategory
  }
  const url = BASE_URL + API_ENDPOINTS.getQuestions;
  return axios.post(url, body).then((response) => {
    return response.data;
  });
}



const getAllApprovedItems = () => {
  const url = BASE_URL + API_ENDPOINTS.getAllApprovedItems;
  return axios.get(url).then((response) => {
    return response.data;
  });
}




const getInReviewItems = (status) => {
  const body = {
    uploadStatus: status
  }
  const url = BASE_URL + API_ENDPOINTS.getInReviewItems;
  return axios.post(url,body).then(response => {
    return response.data;
  });
}

const updateAcceptItem = (id,status,question,answer) => {
  const body = {
    id,
    status,
    question,
    answer
  }
  const url = BASE_URL + API_ENDPOINTS.updateReviewItems;
  return axios.put(url,body).then(response => {
    return response.data;
  })
}


const updateLikesCount = (questionId) => {
  const body = {
    _id: questionId
  }
  const url = BASE_URL + API_ENDPOINTS.updateLikes;
  return axios.put(url,body)
  .then(response => {
    return response.data;
  })
}


const pusherMessage = (payloadObj) => {
  const body = payloadObj;
  const url = BASE_URL + API_ENDPOINTS.pusherMessage;
   return axios.post(url,body)
   .then(response => {
     return response.data
   })
}


export default {
  pusherMessage,
  updateLikesCount,
  submitContent,
  getQuestions,
  getInReviewItems,
  updateAcceptItem,
  getAllApprovedItems
};
