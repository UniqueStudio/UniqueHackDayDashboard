import { AnyAction } from 'redux';

export interface ApplyProcessData {
  // isD: boolean; // isDetailFormSubmitted
  // isT: boolean; // isTeamUpProcessFinished
  // isC: boolean; // isApplyConfirmed

  // canRouteInDetailView: boolean;
  // canRouteInTeamUpView: boolean;
  // canRouteInConfirmView: boolean;

  maxStep: number;
}

export default function applyProcess(
  state: ApplyProcessData = {
    // isD: false,
    // isT: false,
    // isC: false,

    maxStep: 0,
  },
  action: AnyAction,
) {
  // const regexp = /^APPLY_PROCESS_IS_[A-Z]$/;
  // const [, DTC]: [any, 'D' | 'T' | 'C'] = action.type.match(regexp) || new Array(5);
  // if (DTC) {
  //   const next = action.payload;
  //   let extra;
  //   if (DTC === 'D') {
  //     if (next) {
  //       extra = {
  //         canRouteInTeamUpView: true,
  //       };
  //     } else {
  //       extra = {
  //         canRouteInTeamUpView: false,
  //       };
  //     }
  //   }

  //   if (DTC === 'T') {
  //     if (next) {
  //       extra = {
  //         canRouteInTeamUpView: state.isD,
  //       };
  //     } else {
  //       extra = {
  //         canRouteInTeamUpView: false,
  //       };
  //     }
  //   }
  //   return {
  //     ...state,
  //     [`is${DTC}`]: next,
  //     ...extra,
  //   };
  // }

  if (action.type === 'APPLY_PROCESS_SET_MAX_STEP') {
    return { maxStep: action.payload };
  }
  return state;
}
