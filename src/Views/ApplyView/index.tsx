import * as React from 'react';
import Card from 'antd/es/card';
import Steps from 'antd/es/steps';
import Icon from 'antd/es/icon';

import { Switch, Route, RouteComponentProps } from 'react-router';
import DetailForm from '../../Components/DetailForm/index';

export default class ApplyView extends React.Component<RouteComponentProps<{ _: string }>> {
  render() {
    return (
      <Card bordered={false} title="完善报名信息">
        <Steps current={0} size="small">
          <Steps.Step title="填写信息" />
          <Steps.Step title="组队" />
          <Steps.Step title="完成报名" />
        </Steps>
        <Switch>
          <Route path={`${this.props.match.url}/detail`} component={DetailForm} />
        </Switch>
      </Card>
    );
  }
}
