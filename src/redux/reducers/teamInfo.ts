import * as TYPE from '../../redux/actions';
export type TeamInfo = API.Team.TeamInfo & {
  isLoading: boolean;
  error: { value?: string; time?: number };
};

export default function teamInfo(
  state: TeamInfo = {
    teamName: '',
    teamLeader: {
      username: '',
      name: '',
      isAccepted: false,
      school: '',
    },
    members: [],
    createdTime: 0,
    prizeInfo: '',
    isLoading: false,
    error: {},
  },
  action: { type: string; payload?: TeamInfo },
) {
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
    default:
      return state;
  }
}
