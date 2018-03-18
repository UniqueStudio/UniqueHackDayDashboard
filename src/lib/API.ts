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
      Authorization: authorizationToken || '',
    },
    body: method === 'GET' ? '' : JSON.stringify(body),
  }) as any;
}) as API.RequestFunc;

export default request;

export const getToken = () => authorizationToken;
