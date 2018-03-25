import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';

import UserEntryLayout from '../../Layouts/UserEntryLayout/index';
import LoginView from '../LoginView';

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
