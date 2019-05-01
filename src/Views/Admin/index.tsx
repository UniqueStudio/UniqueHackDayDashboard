import * as React from 'react';
import UserVerify from './UserVerify';
import Tabs from 'antd/es/tabs';

import './style.less';

export default class Admin extends React.Component {
    render() {
        const TabPane = Tabs.TabPane;
        return (
            <Tabs tabBarStyle={{ textAlign: 'left' }} animated={false}>
                <TabPane tab="用户审核" key="user">
                    <UserVerify />
                </TabPane>
                <TabPane tab="报销系统" key="message">
                    {'正在加速开发中'}
                </TabPane>
                <TabPane tab="行为记录" key="behavior">
                    {'正在加速开发中'}
                </TabPane>
                <TabPane tab="状态监控" key="stateMonitor">
                    {'正在加速开发中'}
                </TabPane>
            </Tabs>
        );
    }
}
