import * as React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { RootState } from '../../redux/reducers';
import { MediaQuery } from '../../redux/reducers/mediaQuery';

// import DashboardLayout from '../../Layouts/DashboardLayout';
const DashboardLayout = Loadable({
  loader: () => import('../../Layouts/DashboardLayout'),
  loading: () => <div>正在加载...</div>,
});

const Dashboard: React.SFC<{ mediaQuery: MediaQuery }> = (props) => {
  // props.dispatch();
  return (
    <DashboardLayout mode={props.mediaQuery}>
      <Switch>
        <Route path="/haha" component={DashboardLayout}/>
        <Route path="/hehe" component={DashboardLayout}/>
      </Switch>
    </DashboardLayout>
  );
};

export default connect(
  (state: RootState) => {
    return state;
  },
)(Dashboard);
