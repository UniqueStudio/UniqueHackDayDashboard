import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import Loadable from 'react-loadable';

import UserEntryLayout from '../../Layouts/UserEntryLayout/index';
import LoginView from '../LoginView';
// const UserEntryLayout = Loadable({
//   loader: () => import('../../Layouts/UserEntryLayout'),
//   loading: () => <div>正在加载...</div>,
// });

// const LoginViewLoadable = Loadable({
//   loader: () => import('../LoginView'),
//   loading: () =>;
//  <div>正在加载</div>,
// });

export default class UserEntry extends React.Component<RouteComponentProps<{ _: string }>> {
  render() {
    return (
      <UserEntryLayout>
        <Switch>
          <Route path={`${this.props.match.url}/login`} component={LoginView} />
        </Switch>
      </UserEntryLayout>
    );
  }
}
