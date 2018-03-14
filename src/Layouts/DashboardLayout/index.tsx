import * as React from 'react';
import noop from 'lodash-es/noop';
import classnames from 'classnames';

import Layout from 'antd/es/layout';
import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';
import Tooltip from 'antd/es/tooltip';

import 'antd/lib/layout/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/tooltip/style/index.css';
import '../../styles/main.less';

import cls from './layout.less';

export interface IDashboardLayoutProps {
  children: React.ReactNode;
  mode?: 'phone' | 'desktop';
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

  state = {
    collapsed: false,
  };

  handleMenuItemClick = ({ key }: { key: string }) => {
    if (key === 'mine') {
      this.props.onUserAvatarClick!();
    } else if (key === 'msg') {
      this.props.onUserMsgClick!();
    }
  };

  handleCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { mode } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        {this.renderSider()}
        <Layout.Content style={{ overflowX: 'auto' }} className={cls['content-header-wrapper']}>
          {this.renderHeader()}
          <div
            className={cls['content-wrapper']}
            style={{ padding: mode === 'desktop' ? '20px' : '10px' }}
          >
            {this.props.children}
          </div>
        </Layout.Content>
      </Layout>
    );
  }

  renderHeaderLinks() {
    return [
      // tslint:disable-next-line:jsx-wrap-multiline
      <Menu.Item style={{ border: 'none' }} key="site_hackday">
        <a href="http://hack.hustunique.com" target="_blank">
          Hackday 官网
        </a>
      </Menu.Item>,
      // tslint:disable-next-line:jsx-wrap-multiline
      <Menu.Item style={{ border: 'none' }} key="site_unqiue">
        <a href="http://www.hustunique.com" target="_blank">
          联创团队官网
        </a>
      </Menu.Item>,
    ];
  }

  renderHeader() {
    const minWidth = this.props.mode === 'phone' ? undefined : '440px';
    return (
      <Layout.Header className={cls.header} style={{ minWidth }}>
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', border: 'none' }}
          onClick={this.handleMenuItemClick}
        >
          {this.props.mode !== 'phone' && this.renderHeaderLinks()}
          <Menu.Item className={cls['header-menu-item']} key="mine">
            <Tooltip title="我">
              <Icon type="user" /> 用户名
            </Tooltip>
          </Menu.Item>
          <Menu.Item className={cls['header-menu-item']} key="msg">
            <Tooltip title="消息">
              <Icon type="message" /> 消息
            </Tooltip>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }

  renderSider() {
    const headerIconTextClassName = classnames(cls['header-icon-text'], {
      [cls.hidden]: this.state.collapsed,
    });
    return (
      <Layout.Sider
        className={cls['bg-grey']}
        width="200"
        breakpoint="sm"
        collapsedWidth={60}
        onCollapse={this.handleCollapse}
      >
        <div className={cls['header-icon-wrapper']}>
          <span className={cls['header-icon']} />
          <span className={headerIconTextClassName} />
        </div>

        <Menu className={cls['bg-grey']} theme="dark" selectedKeys={[window.location.hash]}>
          <Menu.Item key="#/console">
            <Icon type="desktop" />
            <span>
              <a className={cls['sider-link']} href="/#/console">
                控制台
              </a>
            </span>
          </Menu.Item>
          <Menu.Item key="#/team_info">
            <Icon type="usergroup-add" />
            <span>
              <a className={cls['sider-link']} href="/#/team_info">
                队伍信息
              </a>
            </span>
          </Menu.Item>
          <Menu.Item key="#/project">
            <Icon type="book" />
            <span>
              <a className={cls['sider-link']} href="/#/project">
                比赛项目
              </a>
            </span>
          </Menu.Item>
          <Menu.Item key="#/admin">
            <Icon type="eye-o" />
            <span>
              <a className={cls['sider-link']} href="/#/admin">
                管理员
              </a>
            </span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}
