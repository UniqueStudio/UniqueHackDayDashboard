import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import DashboardLayout from '../../Layouts/DashboardLayout';
import ConsoleView from '../Console';
import TeamConsole from '../TeamConsole';
import ApplyView from '../ApplyView';
import { replace } from 'react-router-redux';

export interface DashboardProps {
  loggedIn: boolean;
  selfReplace: (loc: string) => void;
  menuItemDisabled: boolean;
}

const Dashboard = (props: DashboardProps) => {
  if (!props.loggedIn) {
    return <Redirect to="/user_entry" />;
  }
  return (
    <DashboardLayout
      replace={props.selfReplace}
      menuItemDisabled={props.menuItemDisabled}
      menuItemDisabledMsg={'必须完成报名表单才能进行该操作!'}
    >
      <Switch>
        <Route path="/team" component={TeamConsole} />
        <Route path="/apply" component={ApplyView} />
        <Route path="/" component={ConsoleView} />
      </Switch>
    </DashboardLayout>
  );
};

export default connect(
  (state: RootState) => {
    const pathname = (state.route && state.route.location && state.route.location.pathname) || '';
    return {
      loggedIn: state.auth.loggedIn,
      menuItemDisabled: pathname.indexOf('/apply') === 0 && pathname !== '/apply/done',
    };
  },
  dispatch => ({
    selfReplace(location: string) {
      dispatch(replace(location));
    },
  }),
)(Dashboard);
