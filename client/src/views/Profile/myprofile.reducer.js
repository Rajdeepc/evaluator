import {
    GET_UPLOADED_STATUS_FAILURE,
    GET_UPLOADED_STATUS_SUCCESS,
    APPROVED_STATUS_SUCCESS
 } from './myprofile.types';

const INITIAL_STATE = {
    getDatabyStatus:null,
    errorGetDataByStatus:{},
    dataByStatus:[],
    approvedData:[]
}

const ProfileReducer = (state = INITIAL_STATE, action) => {
    switch ( action.type ) {
        case GET_UPLOADED_STATUS_FAILURE:
            return {
                ...state,
                getDatabyStatus: false,
                errorGetDataByStatus: action.payload
            }
        case GET_UPLOADED_STATUS_SUCCESS:
            return {
                ...state,
                getDatabyStatus: true,
                dataByStatus: action.payload
            }
        case APPROVED_STATUS_SUCCESS:
            return {
                ...state,
                approvedData: action.payload
            }
        default:
            return state;
    }
};

export default ProfileReducer;