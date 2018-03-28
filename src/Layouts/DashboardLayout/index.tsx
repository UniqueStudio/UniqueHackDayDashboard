import * as React from 'react';
import noop from 'lodash-es/noop';
import classnames from 'classnames';

import Layout from 'antd/es/layout';
import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';

import cls from './layout.less';

import GlobalHeader from '../../Views/GlobalHeader/index';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  onUserMsgClick?: () => void;
  onUserAvatarClick?: () => void;
}

export default class DashboardLayout extends React.Component<DashboardLayoutProps> {
  static defaultProps = {
    className: '',
    onUserAvatarClick: noop,
    onUserMsgClick: noop,
  };

  state = {
    collapsed: false,
  };

  handleCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        {this.renderSider()}
        <Layout.Content style={{ overflowX: 'auto' }} className={cls['content-header-wrapper']}>
          <GlobalHeader />
          <div className={cls['content-wrapper']} style={{ padding: '10px' }}>
            {this.props.children}
          </div>
        </Layout.Content>
      </Layout>
    );
  }

  renderSider() {
    const headerIconTextClassName = classnames(cls['sider-icon-text'], {
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
        <div className={cls['sider-icon-wrapper']}>
          <span className={cls['sider-icon']} />
          <span className={headerIconTextClassName} />
        </div>

        <Menu className={cls['bg-grey']} theme="dark" selectedKeys={[window.location.hash]}>
          <Menu.Item key="#/">
            <Icon type="desktop" />
            <span>
              <a className={cls['sider-link']} href="/#/">
                控制台
              </a>
            </span>
          </Menu.Item>
          <Menu.Item key="#/apply">
            <Icon type="usergroup-add" />
            <span>
              <a className={cls['sider-link']} href="/#/apply">
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
