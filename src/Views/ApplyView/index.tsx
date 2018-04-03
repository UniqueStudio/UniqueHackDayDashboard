import * as React from 'react';
import Card from 'antd/es/card';
import Steps from 'antd/es/steps';

import { Switch, Route, RouteComponentProps, Redirect } from 'react-router';
import DetailForm from '../../Components/DetailForm/index';
import TeamUpView from '../../Views/TeamUpView/index';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

const GenRedirect = (to: string) => () => <Redirect to={to} />;

export interface ApplyViewProps {
  isDetailFormSubmitted: boolean;
}

class ApplyView extends React.Component<ApplyViewProps & RouteComponentProps<{ _: string }>> {
  render() {
    const endpoints = ['detail', 'team_up', 'done'];
    const current = endpoints.findIndex(
      endpoint => this.props.location.pathname.indexOf(endpoint) >= 0,
    );

    const baseURL = this.props.match.url;
    const { isDetailFormSubmitted: isD } = this.props;
    return (
      <Card bordered={false} title="完善报名信息">
        <Steps current={current + 1 ? current : 0} size="small">
          <Steps.Step title="填写信息" />
          <Steps.Step title="组队" />
          <Steps.Step title="完成报名" />
        </Steps>
        <Switch>
          <Route
            path={`${baseURL}/done`}
            component={isD ? () => <div>完成</div> : GenRedirect('/detail')}
          />
          <Route
            path={`${baseURL}/team_up`}
            component={isD ? TeamUpView : GenRedirect('/detail')}
          />
          <Route path={`${baseURL}/detail`} component={DetailForm} />
          {/* <Route path={`${baseURL}/`} component={DetailForm} /> */}
        </Switch>
      </Card>
    );
  }
}

export default connect((state: RootState) => ({
  isDetailFormSubmitted: state.user.isDetailFormSubmitted,
}))(ApplyView);
