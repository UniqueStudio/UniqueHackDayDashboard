import events from 'events';
import WebSocket from 'ws';

import { Store } from 'redux';
import { MemoryHistory } from 'history';
import { RootState } from '../../../src/redux/reducers/index';
import { createServerRedux } from '../../../src/redux/store/server';

export default class Client extends events.EventEmitter {
  private closedTime: number = Date.now();
  private ws: WebSocket;
  private history: MemoryHistory;
  private store: Store<RootState>;

  constructor(ws: WebSocket) {
    super();
    this.ws = ws;
    ws.on('message', this.handleMessage);
    ws.on('close', () => (this.closedTime = Date.now()));

    const serverRedux = createServerRedux();
    this.history = serverRedux.serverHistory;
    this.store = serverRedux.serverStore;

    this.history.listen(() => {
      // console.log(location, action);
    });
  }

  private handleMessage = (data: WebSocket.Data) => {
    const actions: Actions.Action[] = JSON.parse(data.toString());

    // const sideEffectAction = actions.pop()!;
    actions.forEach(action => this.store.dispatch(action));

    this.handleSideEffect();
    // this.emit('actions', actions);
  };

  private handleSideEffect = (/* sideEffectAction: Actions.Action */) => {
    // hehe
  };

  dispatch(action: Actions.Action) {
    if (this.ws) {
      this.ws.send(JSON.stringify(action));
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
}
