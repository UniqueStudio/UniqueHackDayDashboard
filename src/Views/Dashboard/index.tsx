import * as React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { RootState } from '../../redux/reducers';
import { MediaQuery } from '../../redux/reducers/mediaQuery';

import Console from '../Console/index';

// import DashboardLayout from '../../Layouts/DashboardLayout';
const DashboardLayout = Loadable({
  loader: () => import('../../Layouts/DashboardLayout'),
  loading: () => <div>正在加载...</div>,
});

const Dashboard: React.SFC<{ mediaQuery: MediaQuery }> = (props) => {
  return (
    <DashboardLayout mode={props.mediaQuery}>
      <Switch>
        <Route path="/console" component={Console}/>
      </Switch>
    </DashboardLayout>
  );
};

export default connect(
  (state: RootState) => {
    return state;
  },
)(Dashboard);
