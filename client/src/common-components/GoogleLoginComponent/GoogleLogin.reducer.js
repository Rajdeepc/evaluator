import 
{
    USER_LOGGED_IN_SUCCESS,
    USER_LOGOUT_SUCCESS
} from './GoogleLogin.action.types'


const INITIAL_STATE = {
    loggedinStatus: undefined,
    loggedInUserDetails: {}
}


const LoginReducer = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        case USER_LOGGED_IN_SUCCESS:
            return {
                ...state,
                loggedinStatus: true,
                loggedInUserDetails: JSON.parse(action.payload)
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loggedinStatus: false,
                loggedInUserDetails: {}
            }
            default:
                return state
    }
}

export default LoginReducer