import { AnyAction } from 'redux';
import * as TYPE from '../../actions';
interface Status {
  username: string;
  state?: 0 | 1;
  inWaitList?: boolean;
}
export interface UserStatus {
  value: Status[];
  isSubmitting: boolean;
  error: { value?: string; time?: number };
  radios: {
    name?: number;
  };
}

export default (
  state: UserStatus = { value: [], isSubmitting: false, error: {}, radios: {} },
  action: AnyAction,
) => {
  switch (action.type) {
    case TYPE.ADMIN_USER_STATUS_CHANGE.OK:
      return {
        ...state,
        value: action.payload,
        radios: {
          ...state.radios,
          [action.username]: action.radioVal,
        },
      };
    case TYPE.ADMIN_USER_STATUS_CHANGE.FAIL:
      return {
        ...state,
        value: [],
        radios: {},
      };
    case TYPE.ADMIN_USER_SUBMIT.START:
      return {
        ...state,
        isSubmitting: true,
      };
    case TYPE.ADMIN_USER_SUBMIT.OK:
      return {
        ...state,
        value: [],
        radios: {},
        isSubmitting: false,
      };
    case TYPE.ADMIN_USER_SUBMIT.FAIL:
      return {
        ...state,
        value: [],
        radios: {},
        isSubmitting: false,
        error: { value: action.payload, time: Date.now() },
      };
    default:
      return state;
  }
};
