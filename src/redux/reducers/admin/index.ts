<<<<<<< HEAD
import userState, { UserStatus } from './userStatus';
=======
import userState, { userStatus } from './userStatus';
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
import { combineReducers } from 'redux';
import userVerify, { AdminUser } from './userVerify';

export interface Admin {
  users: AdminUser;
<<<<<<< HEAD
  userState: UserStatus;
=======
  userState: userStatus;
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
}

export default combineReducers({
  users: userVerify,
<<<<<<< HEAD
  userState,
=======
  userState: userState,
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
});
