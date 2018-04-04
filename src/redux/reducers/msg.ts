export type MsgDataSingle = API.Message.SingleMessage & { unread: boolean };
export type MsgData = MsgDataSingle[];
export default function auth(
  state: MsgData = [],
  action: { type: string; payload?: API.Message.SingleMessage[] },
): MsgData {
  if (action.type.match(/^ADD_MSG_FROM_(UNREAD|ALL)/)) {
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
  }
  return state;
}
