import userState, { userStatus } from './userStatus';
import { combineReducers } from 'redux';
import userVerify, { AdminUser } from './userVerify';

export interface Admin {
  users: AdminUser;
  userState: userStatus;
}

export default combineReducers({
  users: userVerify,
  userState: userState,
});
