import * as React from 'react';
import { noop } from 'lodash';

import Layout from 'antd/es/layout';
import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';
import Tooltip from 'antd/es/tooltip';

import Logo from '../../assets/images/unique-hackday-icon.png';
import cls from '../../styles/Dashboard/layout.less';

export interface IDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  onUserMsgClick?: () => void;
  onUserAvatarClick?: () => void;
}

export default class DashboardLayout extends React.Component<IDashboardLayoutProps> {
  static defaultProps = {
    className: '',
    onUserAvatarClick: noop,
    onUserMsgClick: noop,
  };

  handleMenuItemClick = ({ key }: { key: string }) => {
    if (key === 'mine') {
      this.props.onUserAvatarClick!();
    } else if (key === 'msg') {
      this.props.onUserMsgClick!();
    }
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        {this.renderSider()}
        <Layout.Content style={{ overflowX: 'auto' }}>
          {this.renderHeader()}
          {this.props.children}
        </Layout.Content>
      </Layout>
    );
  }

  renderHeader() {
    return (
      <Layout.Header className={cls.header} style={{ minWidth: '600px' }}>
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', border: 'none' }}
          onClick={this.handleMenuItemClick}
        >
          <Menu.Item style={{ border: 'none' }} key="site_hackday">
            <a href="http://hack.hustunique.com" target="_blank">Hackday 官网</a>
          </Menu.Item>
          <Menu.Item style={{ border: 'none' }} key="site_unqiue">
            <a href="http://www.hustunique.com" target="_blank">联创团队官网</a>
          </Menu.Item>
          <Menu.Item className={cls['header-menu-item']} key="mine">
            <Tooltip title="我">
              <Icon type="user"/> 用户名
            </Tooltip>
          </Menu.Item>
          <Menu.Item className={cls['header-menu-item']} key="msg">
            <Tooltip title="消息">
              <Icon type="message"/> 消息
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
              <span className={cls['sider-menu-item']}>
                <Icon type="desktop" /> 控制台
              </span>
            </Menu.Item>
            <Menu.Item>
              <span className={cls['sider-menu-item']}>
                <Icon type="usergroup-add" /> 队伍信息
              </span>
            </Menu.Item>
            <Menu.Item>
              <span className={cls['sider-menu-item']}>
                <Icon type="book" /> 比赛项目
              </span>
            </Menu.Item>
            <Menu.Item>
              <span className={cls['sider-menu-item']}>
              <Icon type="eye-o" /> 管理员
              </span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
    );
  }
}
