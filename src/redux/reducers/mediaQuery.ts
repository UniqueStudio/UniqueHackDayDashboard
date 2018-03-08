import { Action } from 'redux';

export type MediaQuery = 'desktop' | 'phone';
export interface MediaQueryAction extends Action {
  type: 'CHANGE_PLATFORM';
  payload?: {
    platform: MediaQuery;
  };
}
export default function mediaQuery(state: MediaQuery = 'desktop', action: MediaQueryAction) {
  if (action.type === 'CHANGE_PLATFORM' && action.payload) {
    state = action.payload.platform;
  }
  return state;
}
