import * as React from 'react';
import { connect } from 'react-redux';

import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Icon from 'antd/es/icon';

import NoticeIcon from 'ant-design-pro/es/NoticeIcon';

import { RootState } from '../../redux/reducers';
import { UserData } from '../../redux/reducers/user';
import { MsgDataSingle } from '../../redux/reducers/msg';

import cls from '../../Layouts/DashboardLayout/layout.less';
import msgMap from './msgMap';

class GlobalHeader extends React.Component<{
  inUserEntry: boolean;
  loggedIn: boolean;
  handleLogout: () => void;
  user: UserData;
  unreadMsgs: MsgDataSingle[];
  msgs: MsgDataSingle[];
}> {
  render() {
    // const minWidth = this.props.mediaQuery === 'phone' ? undefined : '440px';
    return (
      <Layout.Header className={cls.header}>
        {this.props.inUserEntry && this.renderLeftIcon()}
        <Menu mode="horizontal" className={cls['header-menu']}>
          <Menu.Item className={cls['header-menu-link']} key="site_hackday">
            <a href="http://hack.hustunique.com" target="_blank">
              Hackday 官网
            </a>
          </Menu.Item>
          <Menu.Item className={cls['header-menu-link']} key="site_unqiue">
            <a href="http://www.hustunique.com" target="_blank">
              联创团队官网
            </a>
          </Menu.Item>
          {this.props.loggedIn && this.renderUserMenu()}
        </Menu>
      </Layout.Header>
    );
  }

  renderLeftIcon() {
    return <div className={cls['header-left-icon']} />;
  }

  renderUserMenu() {
    const subMenu = (
      <Menu>
        <Menu.Item key="0" style={{ width: '150px' }}>
          <a href="#/apply/detail">
            <Icon type="edit" style={{ marginRight: '4px' }} /> 编辑报名信息
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span onClick={this.props.handleLogout}>
            <Icon type="close" style={{ marginRight: '4px' }} /> 退出登录
          </span>
        </Menu.Item>
      </Menu>
    );

    const menuItems = [
      <Menu.Item className={cls['header-menu-item']} key="msg" style={{ marginRight: '10px' }}>
        <NoticeIcon count={this.props.unreadMsgs.length}>
          <NoticeIcon.Tab
            emptyText="没有未读消息"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            list={this.props.unreadMsgs.map(msgMap)}
            title="未读消息"
          />
          <NoticeIcon.Tab
            emptyText="没有消息"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            list={this.props.msgs.map(msgMap)}
            title="所有消息"
          />
        </NoticeIcon>
      </Menu.Item>,
      <Menu.Item className={cls['header-menu-item']} key="mine">
        <Dropdown overlay={subMenu} trigger={['click']}>
          <span style={{ lineHeight: '50px', display: 'inline-block' }}>
            <Icon type="user" /> {this.props.user.name || this.props.user.username}
          </span>
        </Dropdown>
      </Menu.Item>,
    ];
    return menuItems.reverse();
  }
}

export default connect(
  (state: RootState) => {
    return {
      inUserEntry: state.route!.location.pathname.indexOf('/user_entry') === 0,
      loggedIn: state.auth.loggedIn,
      user: state.user,
      unreadMsgs: state.msg.filter(msg => msg.unread),
      msgs: state.msg,
    };
  },
  dispatch => ({
    handleLogout() {
      dispatch({ type: 'LOGOUT_CLICKED' });
    },
  }),
)(GlobalHeader);
