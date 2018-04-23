import { EventEmitter } from 'events';
import delay from './delay';

class LongConnection extends EventEmitter {
  ws: WebSocket;

  constructor() {
    super();

    this.ws = new WebSocket(this.url);
    this.init();
    this.ws.addEventListener('open', () => this.emit('open'));
    this.ws.addEventListener('close', this.handleClose);
  }

  handleClose = async () => {
    const startReConnectTime = Date.now();
    for (let i = 0; i < 3; i++) {
      const ws = await new Promise<WebSocket | null>(resolve => {
        const trial = new WebSocket(this.url);
        this.init.call({ ws: trial });
        trial.addEventListener('open', () => resolve(trial));
        trial.addEventListener('close', () => resolve(null));
      });
      if (ws) {
        this.ws = ws;
        this.emit('reopen');
        this.ws.addEventListener('close', this.handleClose);
        return;
      }
      await delay(1000);
    }
    if (Date.now() - startReConnectTime <= 5000) {
      this.emit('terminate');
    } else {
      this.handleClose();
    }
  };

  init() {
    this.ws.addEventListener('open', () => {
      this.send(
        JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      );
    });
    this.ws.addEventListener('message', ({ data }) => this.emit('message', data));
  }

  // get addEventListener() {
  // return this.ws.addEventListener;
  // }

  // get removeEventListener() {
  //   return this.ws.removeEventListener;
  // }
  get url() {
    const clientId = localStorage.getItem('clientId');
    return `ws://localhost:8080/${clientId ? `?clientId=${clientId}` : ''}`;
  }

  get close() {
    return bindThis(this.ws.close, this.ws);
  }

  private dataQueue: string[] = [];
  send(data: string) {
    this.dataQueue.push(data);
    // return bindThis(this.ws.send, this.ws);
    if (this.ws.readyState !== this.ws.OPEN) {
      this.ws.addEventListener('open', () => {
        this.dataQueue.forEach(d => this.ws.send(d));
        this.dataQueue = [];
      });
    } else {
      this.dataQueue.forEach(d => this.ws.send(d));
      this.dataQueue = [];
    }
  }

  get readyState() {
    return this.ws.readyState;
  }

  static OPEN = WebSocket.OPEN;
  static CONNECTING = WebSocket.CONNECTING;
  static CLOSED = WebSocket.CLOSED;
  static CLOSING = WebSocket.CLOSING;

  OPEN = WebSocket.OPEN;
  CONNECTING = WebSocket.CONNECTING;
  CLOSED = WebSocket.CLOSED;
  CLOSING = WebSocket.CLOSING;
}

export default LongConnection;

(window as any).LongConnection = LongConnection;

// tslint:disable-next-line:ban-types
function bindThis<A extends Function>(func: A, thisArg: any): A {
  return func.bind(thisArg);
}
