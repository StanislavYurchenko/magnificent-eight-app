import authActions from './authAction';
import {
  registration,
  login,
  logout,
  getUserInfo,
  userToken,
  googleRequest,
} from '../../services/authApi';

const registrationUser = ({ name, email, password }) => async dispatch => {
  dispatch(authActions.regUserRequest());

  try {
    await registration({ name, email, password });
    dispatch(authActions.regUserSuccess());
  } catch (err) {
    dispatch(authActions.regUserError(err.message));
  }
};

const loginUser = ({ email, password }) => async dispatch => {
  dispatch(authActions.loginUserRequest());

  try {
    const { data } = await login({ email, password });
    const { name, token } = data.result;
    userToken.set(token);
    dispatch(authActions.loginUserSuccess({ name, token }));
  } catch (err) {
    dispatch(authActions.loginUserError(err.message));
  }
};

const logoutUser = () => async dispatch => {
  dispatch(authActions.logoutUserRequest());

  try {
    await logout();
    userToken.unset();
    dispatch(authActions.logoutUserSuccess());
  } catch (err) {
    dispatch(authActions.logoutUserError(err.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();
  if (!persistedToken) return;
  userToken.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const { data } = await getUserInfo();
    const { result } = data;
    dispatch(authActions.getCurrentUserSuccess(result.name));
  } catch (err) {
    dispatch(authActions.getCurrentUserError(err.message));
  }
};

const googleLogin = ({ name, token }) => dispatch => {
  try {
    userToken.set(token);
    dispatch(authActions.googleUserSuccess({ name, token }));
  } catch (err) {
    dispatch(authActions.googleUserError(err.message));
  }
};

export { registrationUser, loginUser, logoutUser, getCurrentUser, googleLogin };
