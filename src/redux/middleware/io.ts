import { Middleware, AnyAction } from 'redux';
import * as TYPE from '../actions/index';
import Message from 'antd/es/message';
import LongConnection from '../../lib/LongConnection';

const ws = new LongConnection();

const sideEffect: Middleware = store => next => {
  ws.on('actions', actions => {
    actions.forEach((action: AnyAction) => store.dispatch(action));
  });

  ws.once('terminate', () => {
    Message.error('与服务器的链接已经断开，请尝试刷新', 0);
  });

  let actionQueue: AnyAction[] = [];

  window.addEventListener('unload', () => {
    ws.send(JSON.stringify(bundleActions(actionQueue)));

    actionQueue = [];
  });

  return action => {
    actionQueue.push(action);
    /**
     * 以副作用的action为间隔
     * 打包纯的、重复的action
     */
    switch (action.type) {
      case TYPE.SEND_TOKEN:
      case TYPE.LOGIN_FORM_SUBMIT._:
      case TYPE.REGISTER_FORM_SUBMIT._:
        ws.send(JSON.stringify(bundleActions(actionQueue)));

        actionQueue = [];
        break;
    }

    return next(action);
  };
};

export default sideEffect;

function bundleActions(actions: AnyAction[]) {
  const copyActions = actions.slice(0);
  return copyActions.reduce(
    (p, action) => {
      if (p.length === 0 || action.type !== p[p.length - 1].type) {
        return [...p, action];
      } else {
        if (typeof action.payload === 'object') {
          const { type, payload } = p.pop()!;
          return [...p, { type, payload: { ...payload, ...action.payload } }];
        }
      }
      return p;
    },
    [] as AnyAction[],
  );
}
