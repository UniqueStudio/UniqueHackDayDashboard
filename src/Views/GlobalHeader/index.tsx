import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Icon from 'antd/es/icon';

import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { NoticeIconData } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';

import { RootState } from '../../redux/reducers';
import { PartialUserInfo } from '../../redux/reducers/user';
import { SingleMessage } from '../../redux/reducers/msg';
import * as TYPE from '../../redux/actions';

import cls from '../../Layouts/DashboardLayout/layout.less';
import msgMap from './msgMap';

const noop = () => void 0;

class GlobalHeader extends React.Component<{
    inUserEntry: boolean;
    loggedIn: boolean;
    handleLogout: () => void;
    user: PartialUserInfo;
    unreadMsgs: SingleMessage[];
    msgs: SingleMessage[];

    setReadAll: () => void;
    detailEdit: () => void;
    setRead: (id: number) => void;
    deleteAll: () => void;
    dispatch: Dispatch<any>;
}> {
    handleMessageClick = (item: NoticeIconData) => {
        this.props.setRead((item as any).id);
        (item as any).clickHandler(this.props.dispatch);
    };

    render() {
        return (
            <Layout.Header className={cls.header}>
                {this.props.inUserEntry && this.renderLeftIcon()}
                <Menu mode="horizontal" className={cls['header-menu']}>
                    <Menu.Item className={cls['header-menu-link']} key="site_hackday">
                        <a href="http://hack.hustunique.com" target="_blank" rel="noopener">
                            Hackday 官网
                        </a>
                    </Menu.Item>
                    <Menu.Item className={cls['header-menu-link']} key="site_unqiue">
                        <a href="http://www.hustunique.com" target="_blank" rel="noopener">
                            联创团队官网
                        </a>
                    </Menu.Item>
                    {this.props.loggedIn && this.renderUserMenu()}
                </Menu>
                {!this.props.loggedIn && this.renderGithubAchor()}
            </Layout.Header>
        );
    }

    renderLeftIcon() {
        return <div className={cls['header-left-icon']} />;
    }

    renderGithubAchor() {
        return (
            <div className={cls['header-right-icon']}>
                <a href="https://github.com/UniqueStudio/UniqueHackDayDashboard" rel="noopener">
                    <Icon type="github" style={{ fontSize: '1rem' }} />
                </a>
            </div>
        );
    }

    handleClear = (tableTitle: string) => {
        if (tableTitle === '未读消息') {
            this.props.setReadAll();
        } else {
            this.props.deleteAll();
        }
    };

    handleEdit = () => {
        this.props.detailEdit();
    };

    renderUserMenu() {
        const subMenu = (
            <Menu>
                <Menu.Item key="0" style={{ width: '150px' }} onClick={this.handleEdit}>
                    <Icon type="edit" style={{ marginRight: '4px' }} /> 编辑报名信息
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
            <Menu.Item
                className={cls['header-menu-item']}
                key="msg"
                style={{ marginRight: '10px' }}
            >
                <NoticeIcon
                    count={this.props.unreadMsgs.length}
                    onItemClick={this.handleMessageClick}
                    onClear={this.handleClear}
                >
                    <NoticeIcon.Tab
                        locale=""
                        onClear={noop}
                        onClick={noop}
                        onViewMore={noop}
                        emptyText="没有未读消息"
                        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        list={this.props.unreadMsgs.map(msgMap)}
                        title="未读消息"
                    />
                    <NoticeIcon.Tab
                        locale=""
                        onClear={noop}
                        onClick={noop}
                        onViewMore={noop}
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
        const unreadMsgs = state.msgData.unreadMessages.map(m => ({ ...m, read: false }));
        const readMsgs = state.msgData.readMessages.map(m => ({ ...m, read: true }));
        return {
            inUserEntry: state.router!.location.pathname.indexOf('/user_entry') === 0,
            loggedIn: state.auth.loggedIn,
            user: state.user,
            unreadMsgs,
            msgs: [...unreadMsgs, ...readMsgs].sort((m1, m2) => m1.time - m2.time),
        };
    },
    dispatch => ({
        handleLogout() {
            dispatch({ type: 'LOGOUT_CLICKED' });
        },
        setReadAll() {
            dispatch({ type: TYPE.SET_MSG_READ_ALL });
        },
        setRead(id: number) {
            dispatch({ type: TYPE.SET_MSG_READ._, payload: id });
        },
        deleteAll() {
            dispatch({ type: TYPE.DELETE_MSG_ALL });
        },
        detailEdit() {
            dispatch({ type: TYPE.DETAIL_EDIT });
        },
        dispatch,
    }),
)(GlobalHeader);
