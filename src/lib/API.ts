import * as url from 'url';
import * as qs from 'querystring';

import { hostname } from './const';

export const authorizationToken = () =>
  sessionStorage.getItem('token') || localStorage.getItem('token');

const request = (async (req: any) => {
  const { method, body, headers } = req;

  let { endpoint } = req;

  if (method === 'GET') {
    const { query, pathname } = url.parse(endpoint);
    if (query) {
      const composedQuery = qs.stringify({ ...qs.parse(query), ...body });
      endpoint = `${pathname}?${composedQuery}`;
    } else {
      const composedQuery = qs.stringify(body);
      endpoint = `${pathname}?${composedQuery}`;
    }
  }
  endpoint = `https://${hostname}${endpoint}`;
  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorizationToken()}`,
      },
      body: method === 'GET' ? undefined : JSON.stringify(body),
    });
    try {
      const json = await res.json();
      const token = json.data && json.data.token;
      // json.message = (messageMap as any)[json.message];
      if (token) {
        sessionStorage.setItem('token', token);
      }
      return {
        httpStatusCode: res.status,
        ...json,
      };
    } catch (e) {
      return {
        httpStatusCode: 600,
        message: 'NetworkError',
      };
    }
  } catch (e) {
    return {
      httpStatusCode: 600,
      message: 'NetworkError',
    };
  }
}) as API.RequestFunc;

export default request;

export const getToken = () => authorizationToken;
