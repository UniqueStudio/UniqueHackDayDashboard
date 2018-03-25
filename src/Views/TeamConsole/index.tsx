import * as React from 'react';

// import Status from '../../Components/Status';
import TeamInfo from '../../Components/TeamInfo';
// import HackdayProgress from '../../Components/HackdayProgress';
import DeviceRent from '../../Components/DeviceRent/index';

export default class TeamConsole extends React.Component {
  render() {
    return (
      <div style={{ paddingBottom: '40px' }}>
        <TeamInfo hasEditButton={false} hasDissolutionButton={true} />
        <div style={{ height: '20px' }} />
        <DeviceRent />
      </div>
    );
  }
}
