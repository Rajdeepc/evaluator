import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';
import { 
    getApiDataByTopic, 
    postCommentAction,
    getCommentsBySubtopic,
    updateToPostLike,
    searchAction,
    getSubTopicDetailsAction,
    getSortedItemsByLikes,
    getSortedItemsByDate
} from  './home.action';

const mapStateToProps = state => ({
    filteredState: state.HomeReducer
});

export default connect(mapStateToProps, {
    getApiDataByTopic,
    postCommentAction,
    getCommentsBySubtopic,
    updateToPostLike,
    searchAction,
    getSubTopicDetailsAction,
    getSortedItemsByDate,
    getSortedItemsByLikes
})(HomeComponent);
