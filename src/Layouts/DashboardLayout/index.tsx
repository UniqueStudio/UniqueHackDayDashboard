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

import cls from '../../styles/Dashboard/layout.less';

export interface IDashboardLayoutProps {
  children: React.ReactNode;
  mode?: 'mobile' | 'desktop';
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
  }

  handleCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
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

  renderHeaderLinks() {
    return [
      // tslint:disable-next-line:jsx-wrap-multiline
      <Menu.Item style={{ border: 'none' }} key="site_hackday">
        <a href="http://hack.hustunique.com" target="_blank">Hackday 官网</a>
        </Menu.Item>,
      // tslint:disable-next-line:jsx-wrap-multiline
      <Menu.Item style={{ border: 'none' }} key="site_unqiue">
        <a href="http://www.hustunique.com" target="_blank">联创团队官网</a>
      </Menu.Item>,
    ];
  }

  renderHeader() {
    return (
      <Layout.Header className={cls.header} >
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', border: 'none' }}
          onClick={this.handleMenuItemClick}
        >
          {this.props.mode === 'mobile' && this.renderHeaderLinks()}
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
    const headerIconTextClassName = classnames(
      cls['header-icon-text'],
      {
        [cls.hidden]: this.state.collapsed,
      },
    );
    return (
      <Layout.Sider
        className={cls['bg-grey']}
        width="200"
        breakpoint="sm"
        // onCollapased={}
        collapsedWidth={60}
        onCollapse={this.handleCollapse}
      >
        <div className={cls['header-icon-wrapper']}>
          {/* <img className={cls['header-icon']} src={Logo} alt="UniqueHack"/> */}
          <span className={cls['header-icon']} />
          <span className={headerIconTextClassName} />
        </div>

        <Menu className={cls['bg-grey']} theme="dark">
          <Menu.Item>
            <Icon type="desktop" /> <span>控制台</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="usergroup-add" /> <span>队伍信息</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="book" /> <span>比赛项目</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="eye-o" /> <span>管理员</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}
