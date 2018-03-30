import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import DashboardLayout from '../../Layouts/DashboardLayout';
import ConsoleView from '../Console';
import ApplyView from '../ApplyView';

const Dashboard = ({ loggedIn }: { loggedIn: boolean }) => {
  if (!loggedIn) {
    // return <Redirect to="/user_entry" />;
  }
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/apply" component={ApplyView} />
        <Route path="/" component={ConsoleView} />
      </Switch>
    </DashboardLayout>
  );
};

export default connect((state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
})(Dashboard);
