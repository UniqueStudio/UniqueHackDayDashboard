import * as React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import DashboardLayout from '../../Layouts/DashboardLayout';
import ConsoleView from '../Console';
import ApplyView from '../ApplyView';

const Dashboard: React.SFC = () => {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/console" component={ConsoleView} />
        <Route path="/apply" component={ApplyView} />
      </Switch>
    </DashboardLayout>
  );
};

export default connect((state: RootState) => {
  return {};
})(Dashboard);
