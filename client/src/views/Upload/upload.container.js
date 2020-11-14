import { connect } from 'react-redux';
import UploadComponent from '../Upload/UploadComponent';
import { submitFormForUpload,logOutSession} from  '../Upload/upload.action';

const mapStateToProps = state => ({
    uploadobjState: state.UploadDetailsReducer
});

export default connect(mapStateToProps, {
    submitFormForUpload,
    logOutSession
})(UploadComponent);
