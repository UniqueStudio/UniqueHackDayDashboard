import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import DashboardLayout from '../../Layouts/DashboardLayout';
import ConsoleView from '../Console';
import TeamConsole from '../TeamConsole';
import ApplyView from '../ApplyView';
import Admin from '../Admin';
import { replace } from 'react-router-redux';
import OriginDetailView from '../DetailView/index';
import Card from 'antd/es/card';

export interface DashboardProps {
  loggedIn: boolean;
  isC: boolean;
  selfReplace: (loc: string) => void;
  menuItemDisabled: boolean;
}

const RedirectToApply = () => <Redirect to="/apply" />;

const Dashboard = (props: DashboardProps) => {
  if (!props.loggedIn) {
    return <Redirect to="/user_entry" />;
  }

  const { isC } = props;
  return (
    <DashboardLayout
      replace={props.selfReplace}
      menuItemDisabled={props.menuItemDisabled}
      menuItemDisabledMsg={'必须完成报名表单才能进行该操作!'}
    >
      <Switch>
        <Route path="/apply" component={ApplyView} />
        <Route path="/detail_edit" component={DetailView} />
        <Route path="/admin" component={Admin} />
        {/* <Route path="/project" component={} /> */}
        <Route path="/team" component={isC ? TeamConsole : RedirectToApply} />
        <Route path="/" component={isC ? ConsoleView : RedirectToApply} />
      </Switch>
    </DashboardLayout>
  );
};

const DetailView = () => {
  return (
    <Card title="编辑你的详情资料">
      <OriginDetailView />
    </Card>
  );
};

export default connect(
  (state: RootState) => {
    const pathname = (state.route && state.route.location && state.route.location.pathname) || '';
    return {
      loggedIn: state.auth.loggedIn,
      menuItemDisabled: pathname.indexOf('/apply') === 0,
      isC: state.user.isApplyConfirmed,
    };
  },
  dispatch => ({
    selfReplace(location: string) {
      dispatch(replace(location));
    },
  }),
)(Dashboard);
