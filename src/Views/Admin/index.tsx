import * as React from 'react';
import UserVerify from './UserVerify';
import Tabs from 'antd/es/tabs';

export default class Admin extends React.Component {
  render() {
    const TabPane = Tabs.TabPane;
    return (
      <Tabs animated={false}>
        <TabPane tab="用户审核" key="user">
          <UserVerify />
        </TabPane>
        <TabPane tab="消息发布" key="message">
          {}
        </TabPane>
        <TabPane tab="行为记录" key="behavior">
          {}
        </TabPane>
        <TabPane tab="状态监控" key="stateMonitor">
          {}
        </TabPane>
      </Tabs>
    );
  }
}
