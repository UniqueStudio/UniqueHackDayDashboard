export type MsgDataSingle = API.Message.SingleMessage & { unread: boolean };
export type MsgData = MsgDataSingle[];

export type MsgAction =
  | { type: 'MSG_SET_READ'; payload: number }
  | { type: 'MSG_SET_UNREAD'; payload: number }
  | { type: 'MSG_DELETE'; payload: number }
  | { type: 'ADD_MSG_FROM_UNREAD'; payload?: API.Message.SingleMessage[] }
  | { type: 'ADD_MSG_FROM_ALL'; payload?: API.Message.SingleMessage[] };

export default function auth(state: MsgData = [], action: MsgAction): MsgData {
  if (
    action.type !== 'MSG_SET_READ' &&
    action.type !== 'MSG_SET_UNREAD' &&
    action.type !== 'MSG_DELETE'
  ) {
    if (!action.type.match(/^ADD_MSG_FROM_(UNREAD|ALL)$/)) {
      return state;
    }
    const msgMap = state.reduce((p, msg) => {
      return {
        ...p,
        [msg.id]: msg,
      };
    }, {});

    const { payload = [] } = action;
    return Object.values(
      payload.reduce((p, msg) => {
        return {
          ...p,
          [msg.id]: {
            ...msg,
            unread: action.type === 'ADD_MSG_FROM_UNREAD', // ADD_MSG_FROM_ALL
          },
        };
      }, msgMap),
    );
  } else {
    // I was really worrying about the perf
    const filtered = state.filter(msg => msg.id !== action.payload);
    if (action.type === 'MSG_DELETE') {
      return filtered;
    }

    const [selected] = state.filter(msg => msg.id === action.payload);
    return [
      ...filtered,
      {
        ...selected,
        unread: action.type === 'MSG_SET_UNREAD',
      },
    ];
  }
}
