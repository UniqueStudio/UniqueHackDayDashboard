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
}

const Dashboard = (props: DashboardProps) => {
  if (!props.loggedIn) {
    return <Redirect to="/user_entry" />;
  }
  const menuItemDisabled =
    window.location.hash.indexOf('#/apply') === 0 && window.location.hash !== '#/apply/done';
  return (
    <DashboardLayout
      replace={props.selfReplace}
      menuItemDisabled={menuItemDisabled}
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
    return {
      loggedIn: state.auth.loggedIn,
    };
  },
  dispatch => ({
    selfReplace(location: string) {
      dispatch(replace(location));
    },
  }),
)(Dashboard);
