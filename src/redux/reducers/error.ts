import { AnyAction } from 'redux';

export interface ErrorStatus {
  // loginError: string;
  // registerError: string;

  // newTeamError: string;
  [k: string]: { value: string; time: number };
}

export default function loadingStatus(
  state: ErrorStatus = {
    // loginError: '',
    // registerError: '',
    // newTeamError: '',
  },
  action: AnyAction,
) {
  const [, type] = action.type.match(/^([A-Z_]+?)_(SUBMIT_)?FAILED$/) || new Array(3);
  if (type) {
    return {
      ...state,
      [`${type.toLowerCase().replace(/_[a-z]/g, (e: string) => e[1].toUpperCase())}Error`]: {
        value: action.payload,
        time: Date.now(),
      },
    };
  }

  return state;
}
