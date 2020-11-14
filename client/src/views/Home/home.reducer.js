import { 
    POST_LIKECOUNT_FAILURE,
    POST_LIKECOUNT_SUCCESS,
    SET_LOADING,
    GET_DATA_SUCCESS, 
    GET_DATA_FAILURE,
    POST_COMMENT_FAILURE,
    POST_COMMENT_SUCCESS,
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_SUCCESS,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCESS,
    SUBTOPIC_DETAILS_ERROR,
    SUBTOPIC_DETAILS_SUCCESS,
    GET_SORTED_ITEM_DATE_FAILURE,
    GET_SORTED_ITEM_DATE_SUCCESS,
    GET_SORTED_ITEM_LIKES_FAILURE,
    GET_SORTED_ITEM_LIKES_SUCCESS
} from './home.types';

const INITIAL_STATE = {
    dataByTopic: [],
    getCallApiSuccess:null,
    getCallError: {},
    loading: null,
    postCommentSuccess: null,
    commentArray:[],
    updatedCommentsArray:[],
    updatedCommentObj:{},
    searchData:[],
    getSubTopicData:null,
    subtopicdataError:{},
    subTopicDetailsObj:{},
    updatedLikeCount:null,
    getSortedListByDate:null,
    getSortedListByLikes:null,
    sortedDataByDate:[],
    noSortedDataByLikes:{},
    noSortedDataBydate:{},
    sortedDataByLikes:[]
}

const HomeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        case GET_DATA_SUCCESS:
            return {
                ...state,
                getCallApiSuccess: true,
                dataByTopic: action.payload.itemsByTopic
            }
       case GET_DATA_FAILURE:
           return {
               ...state,
               getCallApiSuccess: false,
               getCallError: action.payload
           }
        case SUBTOPIC_DETAILS_ERROR:
            return {
                ...state,
                getSubTopicData: false,
                subtopicdataError: action.payload
            }
        case SUBTOPIC_DETAILS_SUCCESS:
            return {
                ...state,
                getSubTopicData: true,
                subTopicDetailsObj: action.payload.itemDetails
            }
        case POST_COMMENT_FAILURE:
        return {
            ...state,
            postCommentSuccess: false,
            postCommentError : action.payload
        }
        case POST_COMMENT_SUCCESS:
        return {
            ...state,
            postCommentSuccess: true,
            subTopicDetailsObj: action.payload
        }
        case GET_COMMENTS_FAILURE:
            return {
                ...state,
                getCommentsStatus: false,
                getCommentsError: action.payload
            }
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                getCommentsStatus: true,
                commentArray: action.payload
            }
        case POST_LIKECOUNT_FAILURE:
            return {
                ...state,
                postLikeStatus: false,
                updateLikeStatusError: action.payload
            }
        case POST_LIKECOUNT_SUCCESS:
            return {
                ...state,
                postLikeStatus: true,
                subTopicDetailsObj : action.payload
            }
        case GET_SEARCH_FAILURE:
            return {
                ...state,
                getSearchDataStatus: false,
                noSearchData : action.payload
            }
        case GET_SEARCH_SUCCESS:
            return {
                ...state,
                getSearchDataStatus: true,
                dataByTopic: action.payload
            }
        case GET_SORTED_ITEM_DATE_FAILURE:
            return {
                ...state,
                getSortedListByDate : false,
                noSortedDataBydate: action.payload
            }
        case GET_SORTED_ITEM_DATE_SUCCESS:
            return {
                ...state,
                getSortedListByDate: true,
                sortedDataByDate: action.payload
            }
        case GET_SORTED_ITEM_LIKES_FAILURE:
            return {
                ...state,
                getSortedListByLikes: false,
                noSortedDataByLikes: action.payload
            }
        case GET_SORTED_ITEM_LIKES_SUCCESS:
            return {
                ...state,
                getSortedListByLikes: true,
                sortedDataByLikes: action.payload
            }
        default:
            return state;
    }
}

export default HomeReducer;