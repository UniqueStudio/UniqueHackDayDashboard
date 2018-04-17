import * as TYPE from '../../redux/actions';
import { AnyAction } from 'redux';
export type TeamInfo = API.Team.TeamInfo & {
  isLoading: boolean;
  error: { value?: string; time?: number };
};

const initialState = {
  teamName: '',
  teamLeader: {
    username: '',
    name: '',
    isAccepted: null,
    school: '',
  },
  members: [],
  createdTime: 0,
  prizeInfo: '',
  isLoading: false,
  error: {},
};

export default function teamInfo(state: TeamInfo = initialState, action: AnyAction) {
  switch (action.type) {
    case TYPE.LOAD_TEAM_INFO.START:
      return {
        ...state,
        isLoading: true,
      };
    case TYPE.LOAD_TEAM_INFO.OK:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case TYPE.LOAD_TEAM_INFO.FAIL:
      return {
        ...state,
        isLoading: false,
        error: { value: action.payload, time: Date.now() },
      };

    case TYPE.EXIT_TEAM.OK:
    case TYPE.DELETE_TEAM.OK:
      return initialState;

    case TYPE.DELETE_TEAM_MEMBER.OK:
      return {
        ...state,
        members: state.members.filter(member => member.username !== action.payload),
      };

    case TYPE.CHANGE_TEAM_LEADER.OK:
      return {
        ...state,
        teamLeader: state.members.find(member => member.username === action.payload),
      };
    default:
      return state;
  }
}
