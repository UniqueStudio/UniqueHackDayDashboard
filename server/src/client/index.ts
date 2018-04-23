import events from 'events';
import WebSocket from 'ws';
import handleSideEffect from './handleSideEffects';

import { Store, AnyAction } from 'redux';
import { MemoryHistory } from 'history';
import { RootState } from '../../../src/redux/reducers/index';
import { createServerRedux } from '../../../src/redux/store/server';

export default class Client extends events.EventEmitter {
  private closedTime: number = Date.now();
  private ws: WebSocket;
  private history: MemoryHistory;
  private store: Store<RootState>;
  private actionsHistory: AnyAction[];

  constructor(ws: WebSocket) {
    super();
    this.ws = ws;
    this.actionsHistory = [];
    ws.on('message', this.handleMessage);
    ws.on('close', () => (this.closedTime = Date.now()));

    const serverRedux = createServerRedux(this.actionsLogger);
    this.history = serverRedux.serverHistory;
    this.store = serverRedux.serverStore;

    this.history.listen(() => {
      // console.log(location, action);
    });
  }

  private handleMessage = async (data: WebSocket.Data) => {
    const jsonData = JSON.parse(data.toString());
    if (jsonData.token) {
      return;
    }
    const actions: Actions.Action[] = jsonData;
    const sideEffectAction = actions[actions.length - 1];
    actions.forEach(action => this.store.dispatch(action));

    const resultAction = await handleSideEffect(sideEffectAction, this.store.getState());

    if (resultAction) {
      this.store.dispatch(resultAction);
      this.dispatch(resultAction);
    }
  };

  dispatch(action: AnyAction) {
    if (this.ws) {
      this.ws.send(JSON.stringify([action]));
    }
  }

  take(regexp: RegExp): Promise<Actions.Action> {
    return new Promise(resolve => {
      const handler = (data: WebSocket.Data) => {
        const jsonData: Actions.Action = JSON.parse(data.toString());
        if (jsonData.type.match(regexp)) {
          resolve(jsonData);
          return;
        }
        this.ws.once('message', handler);
      };
      this.ws.once('message', handler);
    });
  }

  destroy() {
    // something to destroy
  }

  replaceWebSocket(ws: WebSocket) {
    this.ws = ws;
    ws.on('message', this.handleMessage);
    ws.on('close', () => (this.closedTime = Date.now()));
  }

  get reuseable() {
    return (
      // closed but no longer then 1 minute
      this.ws.readyState === this.ws.CLOSED && Date.now() - this.closedTime <= 1000 * 60
    );
  }

  restore() {
    // restore client after refresh
    this.dispatch({
      type: 'RESTORE',
      payload: this.store.getState(),
    });
  }

  toJSON() {
    return JSON.stringify({
      state: this.store.getState(),
      actionsHistory: this.actionsHistory,
    });
  }

  private actionsLogger = (action: AnyAction) => {
    this.actionsHistory.push(action);
  };
}
