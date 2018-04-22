import { port, host } from '../config';
// import jsonwebtoken from 'jsonwebtoken';
import WebSocket from 'ws';
import http from 'http';
import url from 'url';
import querystring from 'querystring';
import uuid from 'uuid';

import Client from './client/index';

const clients: { [k: string]: Client } = {};
const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws);

    const { query } = url.parse(request.url);
    if (query) {
      const params = querystring.parse(query);
      if (params.clientId && typeof params.clientId === 'string' && clients[params.clientId]) {
        const oldClient = clients[params.clientId];
        if (oldClient.reuseable) {
          oldClient.replaceWebSocket(ws);
          oldClient.restore();
          return;
        }
      }
    }

    const newClient = new Client(ws);
    const clientId = uuid();
    ws.send(JSON.stringify({ clientId }));
    clients[clientId] = newClient;
  });
});

server.listen(port, host);
