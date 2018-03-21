import * as url from 'url';
import * as qs from 'querystring';

const authorizationToken = localStorage.getItem('token') || sessionStorage.getItem('token');

const request = ((req: any) => {
  const { method, body, headers } = req;

  let { endpoint } = req;

  if (method === 'GET') {
    const { query, pathname } = url.parse(endpoint);
    if (query) {
      const composedQuery = qs.stringify({ ...qs.parse(query), ...body });
      endpoint = `${pathname}?${composedQuery}`;
    }
  }
  return fetch(endpoint, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorizationToken}` || '',
    },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  }).then(async res => {
    try {
      const json = await res.json();
      const token = json.data && json.data.token;
      if (token) {
        localStorage.setItem('token', token);
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
  }) as any;
}) as API.RequestFunc;

export default request;

export const getToken = () => authorizationToken;
