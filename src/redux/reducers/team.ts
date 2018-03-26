import { AnyAction } from 'redux';

export interface TeamFormData {
  teamName: any;
  teamLeaderName: any;
  teamLeaderPhone: any;
}

export default function teamForm(
  state: TeamFormData = {
    teamName: {},
    teamLeaderName: {},
    teamLeaderPhone: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'NEW_TEAM_FORM_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'JOIN_TEAM_FORM_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_NEW_TEAM':
      return {
        teamName: {},
      };
    case 'CLEAR_JOIN_TEAM':
      return {
        teamLeaderName: {},
        teamLeaderPhone: {},
      };
    default:
      return state;
  }
}
