import * as React from 'react';
import Table from 'antd/es/table';
import { RootState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { AdminUser } from '../../../redux/reducers/admin/userVerify';
import * as TYPE from '../../../redux/actions';
import Radio from 'antd/es/radio';
import Button from 'antd/es/button';
import Badge from 'antd/es/badge';
import Dvider from 'antd/es/divider';

export interface UserVerifyProps {
  data: AdminUser['items'];
  statusChange(username: string, state: 0 | 1): { type: string; username: string; state: 0 | 1 };
  isSubmitting: boolean;
  stateChangeSubmit: () => { type: string };
  isSuperAdmin: boolean;
  currentPass: number;
}

class UserVerify extends React.Component<UserVerifyProps> {
  renderOperation = (record: any) => {
    return (
      <React.Fragment>
        {/* tslint:disable-next-line:jsx-no-lambda */}
        <Radio.Group onChange={e => this.props.statusChange(record.username, e.target.value)}>
          <Radio value={1}>通过</Radio>
          <Radio value={0}>拒绝</Radio>
        </Radio.Group>
      </React.Fragment>
    );
  };

  renderSuperAdminFooter(passNum: number, pengdingNum: number, rejectNum: number) {
    return (
      <React.Fragment>
        <Dvider type="vertical" />
        <span>审核中: {pengdingNum}</span>
        <Dvider type="vertical" />
        <span>已通过: {passNum}</span>
        <Dvider type="vertical" />
        <span>未通过: {rejectNum}</span>
      </React.Fragment>
    );
  }

  renderFooter = () => {
    const total = this.props.data.length;
    // 审核中人数
    const pengdingNum = this.props.data.filter(
      user => user.verifyState === 0 || user.verifyState === 1,
    ).length;
    const rejectNum = this.props.data.filter(user => user.verifyState === 2).length;
    const passNum = total - pengdingNum - rejectNum;

    return (
      <React.Fragment>
        <span>总数: {total}</span>
        <Dvider type="vertical" />
        <span>
          当前通过: {this.props.currentPass}/{total}
        </span>
        {this.props.isSuperAdmin && this.renderSuperAdminFooter(passNum, pengdingNum, rejectNum)}
      </React.Fragment>
    );
  };

  filterStatus(value: any, record: any) {
    return record.verifyState === +value;
  }

  render() {
    const Column = Table.Column;
    const statusFilters = [
      { text: '审核中', value: '0' || '1' },
      { text: '未通过', value: '2' },
      { text: '已通过', value: '3' },
    ];

    return (
      <React.Fragment>
        <Table
          scroll={{ x: 700 }}
          pagination={{ pageSize: 10 }}
          dataSource={this.props.data}
          rowKey="name"
          footer={this.renderFooter}
        >
          <Column
            title="角色"
            dataIndex="isLeader"
            key="role"
            // tslint:disable-next-line:jsx-no-lambda jsx-no-multiline-js
            render={(isLeader, record: any) =>
              record.teamId === null ? '未组队' : isLeader ? '队长' : '队员'
            }
          />
          <Column title="姓名" dataIndex="name" key="name" />
          <Column
            title="审核状态"
            dataIndex="verifyState"
            key="status"
            // tslint:disable-next-line:jsx-no-lambda jsx-no-multiline-js
            render={status =>
              status === 3 ? (
                <Badge status="success" text="已通过" />
              ) : status === 2 ? (
                <Badge status="error" text="未通过" />
              ) : (
                <Badge status="warning" text="审核中" />
              )
            }
            filters={this.props.isSuperAdmin ? statusFilters : undefined}
            onFilter={this.filterStatus}
          />
          <Column title="学校" dataIndex="school" key="school" />
          <Column title="城市" dataIndex="city" key="city" />
          <Column title="年级" dataIndex="grade" key="grade" />
          <Column
            title="简历"
            dataIndex="resume"
            key="resume"
            // tslint:disable-next-line:jsx-no-lambda jsx-no-multiline-js
            render={url => (
              <a href={url} target="_blank" rel="noopener">
                链接
              </a>
            )}
          />
          <Column title="操作" key="operate" render={this.renderOperation} />
        </Table>
        <Button
          type="primary"
          disabled={this.props.isSubmitting}
          onClick={this.props.stateChangeSubmit}
          style={{ float: 'right', marginTop: '5px' }}
        >
          提交
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const curPassList = state.admin.userState.value;
  const currentPass = curPassList.filter(user => user.state === 1).length;

  return {
    isSubmitting: state.admin.userState.isSubmitting,
    data: state.admin.users.items,
    isSuperAdmin: state.user.permission === 2,
    currentPass,
  };
};

export default connect(mapStateToProps, {
  statusChange(username: string, state: 0 | 1) {
    return {
      type: TYPE.ADMIN_USER_STATUS_CHANGE._,
      username,
      state,
    };
  },
  stateChangeSubmit() {
    return {
      type: TYPE.ADMIN_USER_SUBMIT._,
    };
  },
})(UserVerify);
