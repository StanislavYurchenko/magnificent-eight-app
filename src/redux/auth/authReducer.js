import { createReducer, combineReducers } from '@reduxjs/toolkit';
import authActions from './authAction';

const userName = createReducer(null, {
  [authActions.loginUserSuccess]: (_, { payload }) => payload.name,
  [authActions.logoutUserSuccess]: () => null,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

const successfulReg = createReducer(false, {
  [authActions.regUserSuccess]: () => true,
  [authActions.regUserError]: () => false,
  [authActions.loginUserSuccess]: () => false,
});

const token = createReducer(null, {
  [authActions.loginUserSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutUserSuccess]: () => null,
  [authActions.getCurrentUserError]: () => null,
});

const isLoggedIn = createReducer(false, {
  [authActions.loginUserSuccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.getCurrentUserRequest]: () => true,

  [authActions.loginUserError]: () => false,
  [authActions.logoutUserSuccess]: () => false,
  [authActions.getCurrentUserError]: () => false,
});

const loading = createReducer(false, {
  [authActions.regUserRequest]: () => true,
  [authActions.regUserSuccess]: () => false,
  [authActions.regUserError]: () => false,

  [authActions.loginUserRequest]: () => true,
  [authActions.loginUserSuccess]: () => false,
  [authActions.loginUserError]: () => false,

  [authActions.logoutUserRequest]: () => true,
  [authActions.logoutUserSuccess]: () => false,
  [authActions.logoutUserError]: () => false,

  [authActions.getCurrentUserRequest]: () => true,
  [authActions.getCurrentUserSuccess]: () => false,
  [authActions.getCurrentUserError]: () => false,
});

const error = createReducer('', {
  [authActions.regUserRequest]: () => '',
  [authActions.regUserSuccess]: () => '',
  [authActions.regUserError]: (_, { payload }) => payload,

  [authActions.loginUserRequest]: () => '',
  [authActions.loginUserSuccess]: () => '',
  [authActions.loginUserError]: (_, { payload }) => payload,

  [authActions.logoutUserRequest]: () => '',
  [authActions.logoutUserSuccess]: () => '',
  [authActions.logoutUserError]: (_, { payload }) => payload,

  [authActions.getCurrentUserRequest]: () => '',
  [authActions.getCurrentUserSuccess]: () => '',
  [authActions.getCurrentUserError]: (_, { payload }) => payload,
});

const authUsersReducer = combineReducers({
  userName,
  successfulReg,
  token,
  isLoggedIn,
  loading,
  error,
});

export default authUsersReducer;
