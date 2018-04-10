import * as React from 'react';
import { connect } from 'react-redux';
import Card from 'antd/es/card';

import TeamInfo from '../../Components/TeamInfo';
// import DeviceRent from '../../Components/DeviceRent/index';
import TeamUpView from '../TeamUpView';
import { RootState } from '../../redux/reducers/index';

class TeamConsole extends React.Component<{ teamId: number }> {
  render() {
    if (this.props.teamId === null) {
      return (
        <Card title="填写组队信息">
          <TeamUpView teamUpSkippable={true} />
        </Card>
      );
    }
    return (
      <div style={{ paddingBottom: '40px' }}>
        <TeamInfo />
        <div style={{ height: '20px' }} />
        {/* <DeviceRent /> */}
      </div>
    );
  }
}

export default connect((state: RootState) => ({
  teamId: state.user.teamId,
}))(TeamConsole);
