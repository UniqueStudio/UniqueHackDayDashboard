// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import noop from 'lodash-es/noop';
import classnames from 'classnames';

import Layout from 'antd/es/layout';
import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';
import message from 'antd/es/message';

import cls from './layout.less';

import GlobalHeader from '../../Views/GlobalHeader/index';
import ScrollToTop from './ScrollToTop';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  onUserMsgClick?: () => void;
  onUserAvatarClick?: () => void;
  menuItemDisabled?: boolean;
  menuItemDisabledMsg?: string;
  replace: (location: string) => void;
}

export default class DashboardLayout extends React.Component<DashboardLayoutProps> {
  static defaultProps = {
    className: '',
    onUserAvatarClick: noop,
    onUserMsgClick: noop,
  };
  contentWrapperRef!: HTMLDivElement | null;

  state = {
    collapsed: false,
  };
  scrollToTop = () => {
    if (this.contentWrapperRef) {
      this.contentWrapperRef.scrollTo(0, 0);
    }
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
          <ScrollToTop scrollToTop={this.scrollToTop}>
            <div ref={ele => (this.contentWrapperRef = ele)} className={cls['content-wrapper']}>
              {this.props.children}
            </div>
          </ScrollToTop>
        </Layout.Content>
      </Layout>
    );
  }

  handleMenuItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!this.props.menuItemDisabled) {
      this.props.replace((e.target as any).dataset.key);
      return;
    }
    const { menuItemDisabledMsg = '暂时没有权限查看' } = this.props;
    message.error(menuItemDisabledMsg);
  };

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
              <a className={cls['sider-link']} data-key="/" onClick={this.handleMenuItemClick}>
                控制台
              </a>
            </span>
          </Menu.Item>
          <Menu.Item key="#/team">
            <Icon type="usergroup-add" />
            <span>
              <a className={cls['sider-link']} data-key="/team" onClick={this.handleMenuItemClick}>
                队伍信息
              </a>
            </span>
          </Menu.Item>
          {false && (
            <Menu.Item key="#/project">
              <Icon type="book" />
              <span>
                <a
                  className={cls['sider-link']}
                  data-key="/project"
                  onClick={this.handleMenuItemClick}
                >
                  比赛项目
                </a>
              </span>
            </Menu.Item>
          )}
          <Menu.Item key="#/admin">
            <Icon type="eye-o" />
            <span>
              <a className={cls['sider-link']} data-key="/admin" onClick={this.handleMenuItemClick}>
                管理员
              </a>
            </span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}
