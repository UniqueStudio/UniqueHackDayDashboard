import * as React from 'react';

import Layout from 'antd/es/layout';
import Tooltip from 'antd/es/tooltip';
import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';

import Logo from '../../assets/images/unique-hackday-icon.png';
import cls from '../../styles/Dashboard/layout.less';

// import Breadcrumb from 'antd/es/breadcrumb';
// import Icon from 'antd/es/icon';
// const SubMenu = Menu.SubMenu;

export interface IDashboardLayoutProps {
  className?: string;
}

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {this.renderSider()}
        <Layout.Content>
          {this.renderHeader()}
        </Layout.Content>
      </Layout>
    );
  }

  renderHeader() {
    return (
      <Layout.Header style={{ backgroundColor: '#fff', borderBottomColor: '#eee' }}>
        111
      </Layout.Header>
    );
  }

  renderSider() {
    return (
      <Layout.Sider style={{ backgroundColor: '#3F3F3F' }} width="200">
          <div className={cls['header-icon-wrapper']}>
            <img className={cls['header-icon']} src={Logo} alt="UniqueHack"/>
          </div>

          <Menu style={{ backgroundColor: '#3F3F3F' }} theme="dark">
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
