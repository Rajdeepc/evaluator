import { combineReducers } from 'redux';

import UploadDetailsReducer from '../../views/Upload/upload.reducer';
import HomeReducer from '../../views/Home/home.reducer';
import ProfileReducer from '../../views/Profile/myprofile.reducer';
import AdminReducer from '../../views/Admin/admin.reducer';
import SelectorBarReducer from '../../components/SelectorBar/selectorbar.reducer';
import LoginReducer from '../../common-components/GoogleLoginComponent/GoogleLogin.reducer'
/** import your reducers */

export default combineReducers({
    LoginReducer,
    UploadDetailsReducer,
    HomeReducer,
    ProfileReducer,
    AdminReducer,
    SelectorBarReducer
})