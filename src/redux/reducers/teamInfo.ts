export type TeamInfo = API.Team.TeamInfo;

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
  },
  action: { type: string; payload?: TeamInfo },
) {
  switch (action.type) {
    case 'SET_TEAM_INFO':
      return {
        ...state,
        ...(action.payload || {}),
      };
    default:
      return state;
  }
}
