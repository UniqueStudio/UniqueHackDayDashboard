import { port, host } from '../config';
// import jsonwebtoken from 'jsonwebtoken';
import WebSocket from 'ws';

import cookie from 'cookie';
import uuid from 'uuid';

import Client from './client/index';

const clients: { [k: string]: Client } = {};
const wss = new WebSocket.Server({ port, host });

// server.listen(port, host);
wss.on('headers', (headers, request) => {
  const cookiesString = Array.isArray(request.headers.cookie)
    ? request.headers.cookie.join('')
    : request.headers.cookie;
  const cookies = cookie.parse(cookiesString || '');

  let clientId: string | null = null;
  let needNewClient = true;
  if (
    cookies &&
    typeof cookies === 'object' &&
    typeof cookies.clientId === 'string' &&
    clients[cookies.clientId] &&
    clients[cookies.clientId].reuseable
  ) {
    needNewClient = false;
    // oldClient.replaceWebSocket(ws);
    // oldClient.restore();

    // no-reuseable
  } else {
    needNewClient = true;

    // delete clients[cookies.clientId];
    clientId = uuid();
    headers.push(`Set-Cookie: clientId=${clientId}`);
    // const newClient = new Client(ws);
    // clients[clientId] = newClient;
  }

  const handleConnection = (ws: any, connectRequest: any) => {
    if (connectRequest.headers['sec-websocket-key'] === request.headers['sec-websocket-key']) {
      // it is the same ws
      if (clientId) {
        if (needNewClient) {
          const newClient = new Client(ws);
          clients[clientId] = newClient;
        } else {
          const oldClient = clients[cookies.clientId];
          oldClient.replaceWebSocket(ws);
          oldClient.restore();
        }
      }
    } else {
      wss.once('connection', handleConnection);
    }
  };
  wss.once('connection', handleConnection);
});
