import { AnyAction } from 'redux';
import * as TYPE from '../actions';
// import { AnyAction } from 'redux';

// // import * as TYPE from '../actions'
// // import msg from './msg';
// // export type MsgDataSingle = API.Message.SingleMessage & { unread: boolean };
// // export type MsgData = MsgDataSingle[];

// // export type MsgAction =
// //   | { type: 'MSG_SET_READ'; payload: number }
// //   | { type: 'MSG_SET_UNREAD'; payload: number }
// //   | { type: 'MSG_DELETE'; payload: number }
// //   | { type: TYPE.GET_UNREAD_MSG_ALL._; payload?: API.Message.SingleMessage[] }
// //   | { type: 'ADD_MSG_FROM_ALL'; payload?: API.Message.SingleMessage[] };

// // export default function auth(state: MsgData = [], action: MsgAction): MsgData {
// //   if (!action.payload) {
// //     return state;
// //   }
// //   if (
// //     action.type !== 'MSG_SET_READ' &&
// //     action.type !== 'MSG_SET_UNREAD' &&
// //     action.type !== 'MSG_DELETE'
// //   ) {
// //     if (!action.type.match(/^ADD_MSG_FROM_(UNREAD|ALL)$/)) {
// //       return state;
// //     }
// //     const msgMap = state.reduce((p, msg) => {
// //       return {
// //         ...p,
// //         [msg.id]: msg,
// //       };
// //     }, {});

// //     const { payload = [] } = action;
// //     return Object.values(
// //       payload.reduce((p, msg) => {
// //         return {
// //           ...p,
// //           [msg.id]: {
// //             ...msg,
// //             unread: action.type === 'ADD_MSG_FROM_UNREAD', // ADD_MSG_FROM_ALL
// //           },
// //         };
// //       }, msgMap),
// //     );
// //   } else {
// //     // I was really worrying about the perf
// //     const filtered = state.filter(msg => msg.id !== action.payload);
// //     if (action.type === 'MSG_DELETE') {
// //       return filtered;
// //     }

// //     const [selected] = state.filter(msg => msg.id === action.payload);
// //     return [
// //       ...filtered,
// //       {
// //         ...selected,
// //         unread: action.type === 'MSG_SET_UNREAD',
// //       },
// //     ];
// //   }
// // }
// export type SingleMessage = { read: boolean } & API.Message.SingleMessage;

// export default function msg(
//   state: {
//     msg: SingleMessage[];
//     isLoading: boolean;
//     error: { value?: string; time?: number };
//   } = { msg: [], isLoading: false, error: {} },
//   action: AnyAction,
// ) {
//   const stateWithRepeatedMsgs = (() => {
//     switch (action.type) {
//       case TYPE.GET_UNREAD_MSG_ALL.START:
//         return { ...state, isLoading: true };
//       case TYPE.GET_UNREAD_MSG_ALL.OK:
//         return {
//           ...state,
//           msg: [
//             ...state.msg,
//             ...(action.payload as SingleMessage[]).map(m => ({ ...m, read: false })),
//           ],
//           isLoading: false,
//         };
//       case TYPE.GET_UNREAD_MSG_ALL.FAIL:
//         return { ...state, isLoading: false, error: { value: action.payload, time: Date.now() } };

//       case TYPE.GET_MSG_ALL.START:
//         return { ...state, isLoading: true };
//       case TYPE.GET_MSG_ALL.OK:
//         return {
//           ...state,
//           msg: [
//             ...state.msg,
//             ...(action.payload as SingleMessage[]).map(m => ({ ...m, read: true })),
//           ],
//           isLoading: false,
//         };
//       case TYPE.GET_MSG_ALL.FAIL:
//         return { ...state, isLoading: false, error: { value: action.payload, time: Date.now() } };

//       default:
//         return state;
//     }
//   })();

//   const msgWithRepeated = stateWithRepeatedMsgs.msg;
//   const msgHash: { [k: string]: SingleMessage } = msgWithRepeated.reduce(
//     (p, k) => ({ ...p, [k.id]: k }),
//     {},
//   );
//   return {
//     ...stateWithRepeatedMsgs,
//     msg: Object.keys(msgHash).reduce((p, k) => [...p, msgHash[k]], [] as SingleMessage[]),
//   };
// }

import differenceBy from 'lodash-es/differenceBy';
// import uniq from 'lodash-es/uniq';

export interface MessageData {
  readMessages: API.Message.SingleMessage[];
  unreadMessages: API.Message.SingleMessage[];
  isLoadingMessages: boolean;
  isLoadingUnreadMessages: boolean;
  error: { value?: string; time?: number };
}
export type SingleMessage = { read: boolean } & API.Message.SingleMessage;
export default function msg(
  state: MessageData = {
    readMessages: [],
    unreadMessages: [],
    isLoadingMessages: false,
    isLoadingUnreadMessages: false,
    error: {},
  },
  action: AnyAction,
): MessageData {
  switch (action.type) {
    case TYPE.GET_UNREAD_MSG_ALL.START:
      return { ...state, isLoadingUnreadMessages: true };
    case TYPE.GET_UNREAD_MSG_ALL.OK:
      return {
        ...state,
        unreadMessages: action.payload,
        isLoadingUnreadMessages: false,
      };
    case TYPE.GET_UNREAD_MSG_ALL.FAIL:
      return {
        ...state,
        isLoadingUnreadMessages: false,
        error: { value: action.payload, time: Date.now() },
      };

    case TYPE.GET_MSG_ALL.START:
      return { ...state, isLoadingMessages: true };
    case TYPE.GET_MSG_ALL.OK:
      return {
        ...state,
        readMessages: differenceBy(
          action.payload as API.Message.SingleMessage[],
          state.unreadMessages,
          'id',
        ),
        isLoadingMessages: false,
      };
    case TYPE.GET_MSG_ALL.FAIL:
      return {
        ...state,
        isLoadingMessages: false,
        error: { value: action.payload, time: Date.now() },
      };

    case TYPE.SET_MSG_READ.OK:
      return {
        ...state,
        unreadMessages: state.unreadMessages.filter(({ id }) => id !== action.payload),
        readMessages: [
          ...state.readMessages,
          ...state.unreadMessages.filter(({ id }) => id === action.payload),
        ],
      };

    case TYPE.DELETE_MSG.OK:
      return {
        ...state,
        readMessages: state.readMessages.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
}
