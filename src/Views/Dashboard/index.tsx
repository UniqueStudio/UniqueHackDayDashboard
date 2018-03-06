import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Location } from 'history';
import Loadable from 'react-loadable';

// import DashboardLayout from '../../Layouts/DashboardLayout';
const DashboardLayout = Loadable({
  loader: () => import('../../Layouts/DashboardLayout'),
  loading: () => <div>111</div>,
});

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
