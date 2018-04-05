import * as React from 'react';
import Card from 'antd/es/card';
import Steps from 'antd/es/steps';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router';

import DetailForm from '../../Views/DetailView';
import TeamUpView from '../../Views/TeamUpView/index';
import { RootState } from '../../redux/reducers';

import Alert from 'antd/es/alert';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

export interface ApplyViewProps {
  isDetailFormSubmitted: boolean;
  teamId: string;
  gotoHome: () => void;
}

class ApplyView extends React.Component<ApplyViewProps & RouteComponentProps<{ _: string }>> {
  render() {
    if (this.isD) {
      return <Redirect to="/" />;
    }
    const endpoints = ['detail', 'team_up', 'done'];
    const current = endpoints.findIndex(
      endpoint => this.props.location.pathname.indexOf(endpoint) >= 0,
    );

    const baseURL = this.props.match.url;
    const { isDetailFormSubmitted: isD, teamId } = this.props;

    const RedirectToDetail = () => <Redirect to={`${baseURL}/detail`} />;
    const RedirectToTeamUp = () => <Redirect to={`${baseURL}/team_up`} />;
    const RedirectToDone = () => <Redirect to={`${baseURL}/done`} />;

    return (
      <Card bordered={false} title="完善报名信息">
        <Steps current={current + 1 ? current : 0} size="small">
          <Steps.Step title="填写信息" />
          <Steps.Step title="组队" />
          <Steps.Step title="完成报名" />
        </Steps>
        <Switch>
          <Route path={`${baseURL}/done`} component={isD ? this.renderDone : RedirectToDetail} />
          <Route
            path={`${baseURL}/team_up`}
            component={isD ? (teamId ? RedirectToDone : TeamUpView) : RedirectToDetail}
          />
          <Route path={`${baseURL}/detail`} component={isD ? RedirectToTeamUp : DetailForm} />
        </Switch>
      </Card>
    );
  }

  renderDone = () => {
    return (
      <div style={{ marginBottom: '24px' }}>
        <Row>
          <Col
            {...{
              xl: { push: 8, span: 8 },
              lg: { push: 6, span: 10 },
              md: { push: 7, span: 12 },
              xs: 24,
              sm: 24,
            }}
          >
            <Alert
              showIcon={true}
              type="success"
              description="你已成功报名 Unique Hackday，请您静候入选佳音。"
              message="恭喜"
            />
            <Button type="primary" style={{ marginTop: '10px' }} onClick={this.props.gotoHome}>
              好的
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  isD = false;

  componentWillMount() {
    // this is a component self state which avoids user enter
    // this user interface again
    this.isD = this.props.isDetailFormSubmitted;
  }
}

export default connect(
  (state: RootState) => ({
    isDetailFormSubmitted: state.user.isDetailFormSubmitted,
    teamId: state.user.teamId,
  }),
  dispatch => ({
    gotoHome() {
      dispatch(replace('/'));
    },
  }),
)(ApplyView);
