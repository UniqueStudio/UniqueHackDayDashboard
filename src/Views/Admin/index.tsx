import * as React from 'react';

import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';

export default class Admin extends React.Component {}

async function test() {
  const res = await fetch('/', { method: 'POST' });
  const resBody = { httpStatusCode: res.status, ...(await res.json()) } as API.User.LoginResponse;
}
