import * as React from 'react';

import Layout from 'antd/es/layout';
import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';
import Tooltip from 'antd/es/tooltip';

import Logo from '../../assets/images/unique-hackday-icon.png';
import cls from '../../styles/Dashboard/layout.less';

export interface IDashboardLayoutProps {
  className?: string;
}

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        {this.renderSider()}
        <Layout.Content>
          {this.renderHeader()}
          {this.props.children}
        </Layout.Content>
      </Layout>
    );
  }

  renderHeader() {
    return (
      <Layout.Header className={cls['layout-header']}>
        <Menu mode="horizontal" style={{ lineHeight: '64px', border: 'none' }}>
          <Menu.Item style={{ border: 'none' }}>
            <Tooltip title="点击访问 Unique Hack 官网">
              <a href="http://hack.hustunique.com" target="_blank">Unique Hack 官网</a>
            </Tooltip>
          </Menu.Item>
          <Menu.Item style={{ border: 'none' }}>
            <Tooltip title="点击访问联创团队官网">
              <a href="http://www.hustunique.com" target="_blank">联创团队官网</a>
            </Tooltip>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }

  renderSider() {
    return (
      <Layout.Sider className={cls['bg-grey']} width="200">
          <div className={cls['header-icon-wrapper']}>
            <img className={cls['header-icon']} src={Logo} alt="UniqueHack"/>
          </div>

          <Menu className={cls['bg-grey']} theme="dark">
            <Menu.Item>
              <span className={cls['menu-item']}>
                <Icon type="desktop" /> 控制台
              </span>
            </Menu.Item>
            <Menu.Item>
              <span className={cls['menu-item']}>
                <Icon type="usergroup-add" /> 队伍信息
              </span>
            </Menu.Item>
            <Menu.Item>
              <span className={cls['menu-item']}>
                <Icon type="book" /> 比赛项目
              </span>
            </Menu.Item>
            <Menu.Item>
              <span className={cls['menu-item']}>
              <Icon type="eye-o" /> 管理员
              </span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
    );
  }
}
