import { AnyAction } from 'redux';

export interface ErrorStatus {
  loginError: string;
  registerError: string;
}

export default function loadingStatus(
  state: ErrorStatus = {
    loginError: '',
    registerError: '',
  },
  action: AnyAction,
) {
  const [_, op, type] = action.type.match(/^(SET|CLEAR)_(.+)_ERROR$/) || new Array(3);
  if (op && type) {
    return {
      ...state,
      [`${type.toLowerCase()}Error`]: op === 'SET' ? action.payload : '',
    };
  }

  return state;
}
