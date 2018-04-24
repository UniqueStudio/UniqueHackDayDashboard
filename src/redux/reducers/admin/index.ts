import userState, { UserStatus } from './userStatus';
import { combineReducers } from 'redux';
import userVerify, { AdminUser } from './userVerify';

export interface Admin {
  users: AdminUser;
  userState: UserStatus;
}

export default combineReducers({
  users: userVerify,
  userState,
});
