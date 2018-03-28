import * as React from 'react';
import Card from 'antd/es/card';
import Steps from 'antd/es/steps';

import { Switch, Route, RouteComponentProps } from 'react-router';
import DetailForm from '../../Components/DetailForm/index';
import TeamUpView from '../../Views/TeamUpView/index';

export default class ApplyView extends React.Component<RouteComponentProps<{ _: string }>> {
  render() {
    const endpoints = ['detail', 'team_up', 'done'];
    const current = endpoints.findIndex(
      endpoint => this.props.location.pathname.indexOf(endpoint) >= 0,
    );
    return (
      <Card bordered={false} title="完善报名信息">
        <Steps current={current} size="small">
          <Steps.Step title="填写信息" />
          <Steps.Step title="组队" />
          <Steps.Step title="完成报名" />
        </Steps>
        <Switch>
          <Route path={`${this.props.match.url}/detail`} component={DetailForm} />
          <Route path={`${this.props.match.url}/team_up`} component={TeamUpView} />
          <Route path={`${this.props.match.url}/done`} component={TeamUpView} />
        </Switch>
      </Card>
    );
  }
}
