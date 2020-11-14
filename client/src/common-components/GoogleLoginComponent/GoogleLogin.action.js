import {
  USER_LOGGED_IN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "./GoogleLogin.action.types";

const loginUserAction = (userDetails) => (dispatch) => {
  const serializedState = JSON.stringify(userDetails);
  sessionStorage.setItem("userData", serializedState);

  dispatch({
    type: USER_LOGGED_IN_SUCCESS,
    payload: serializedState,
  });
};


const logoutUser = () => dispatch => {
    sessionStorage.removeItem("userData");
    dispatch({
        type: USER_LOGOUT_SUCCESS,
        payload: {},
    });
}

export { loginUserAction , logoutUser};
