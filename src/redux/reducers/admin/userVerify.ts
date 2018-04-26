import { AdminUser } from './userVerify';
import { AnyAction } from 'redux';
import * as TYPE from '../../actions';
type userInfo = API.Admin.AdminUserInfo;
export interface AdminUser {
  items: userInfo[];
  isLoading: boolean;
  error: { value?: string; time?: number };
}

export default (
  state: AdminUser = { items: [], isLoading: false, error: {} },
  action: AnyAction,
) => {
  switch (action.type) {
    case TYPE.ADMIN_TEAMS_INFO.START:
      return {
        ...state,
        isLoading: true,
      };
    case TYPE.ADMIN_TEAMS_INFO.OK:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case TYPE.ADMIN_TEAMS_INFO.FAIL:
      return {
        ...state,
        isLoading: false,
        error: { value: action.payload, time: Date.now() },
      };
    default:
      return state;
  }
};
