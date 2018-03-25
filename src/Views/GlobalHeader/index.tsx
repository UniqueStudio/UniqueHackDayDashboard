import * as React from 'react';
import { connect } from 'react-redux';

import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Tooltip from 'antd/es/tooltip';
import Icon from 'antd/es/icon';

import { RootState } from '../../redux/reducers';

import cls from '../../Layouts/DashboardLayout/layout.less';

class GlobalHeader extends React.Component<{ inUserEntry: boolean }> {
  renderHeaderLinks() {
    return [
      // tslint:disable-next-line:jsx-wrap-multiline
    ];
  }

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

  renderLeftIcon() {
    return <div className={cls['header-left-icon']} />;
  }
}

export default connect((state: RootState) => {
  return {
    inUserEntry: state.route!.location.pathname.indexOf('/user_entry') === 0,
  };
})(GlobalHeader);
