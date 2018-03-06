import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Location } from 'history';

import DashboardLayout from '../../Layouts/DashboardLayout';

export default class Dashboard extends React.Component<{ location: Location }> {
  render() {
    return (
      <DashboardLayout>
        <Switch>
          <Route path="/haha" component={DashboardLayout}/>
          <Route path="/hehe" component={DashboardLayout}/>
        </Switch>
      </DashboardLayout>
    );
  }
}
