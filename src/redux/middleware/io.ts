import { Middleware, AnyAction } from 'redux';
import * as TYPE from '../actions/index';

const clientId = localStorage.getItem('clientId');
const ws = new WebSocket(`ws://localhost:8080/${clientId ? `?clientId=${clientId}` : ''}`);

const sideEffect: Middleware = store => next => {
  ws.addEventListener('message', ({ data }) => {
    const jsonData = JSON.parse(data);
    if (Array.isArray(jsonData)) {
      /**
       * dispatch 所有的action，这些 action
       * 对于前端已经是纯的了。
       */
      jsonData.forEach(action => store.dispatch(action));
      return;
    }

    if (typeof jsonData === 'object' && typeof jsonData.clientId === 'string') {
      localStorage.setItem('clientId', jsonData.clientId);
      return;
    }
  });

  let actionQueue: AnyAction[] = [];
  return action => {
    actionQueue.push(action);
    /**
     * 以副作用的action为间隔
     * 打包纯的、重复的action
     */
    switch (action.type) {
      case TYPE.LOAD_USER_INFO._:
      case TYPE.LOGIN_FORM_SUBMIT._:
      case TYPE.REGISTER_FORM_SUBMIT._:
        if (ws.readyState !== ws.OPEN) {
          ws.onopen = (data => () => ws.send(data))(JSON.stringify(batchActions(actionQueue)));
        } else {
          ws.send(JSON.stringify(batchActions(actionQueue)));
        }

        actionQueue = [];
        break;
    }

    return next(action);
  };
};

export default sideEffect;

function batchActions(actions: AnyAction[]) {
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
