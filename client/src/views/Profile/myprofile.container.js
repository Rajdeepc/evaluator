import { connect } from 'react-redux';
import MyProfileUploadsComponent from './MyProfileUploadsComponent';
import { getDataByUploadedStatus } from './myprofile.action';
const mapStateToProps = state => ({
   ProfileReducerState: state.ProfileReducer
});

export default connect(mapStateToProps, {
    getDataByUploadedStatus
})(MyProfileUploadsComponent);
