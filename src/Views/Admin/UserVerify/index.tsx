import * as React from 'react';
import Table from 'antd/es/table';
import { RootState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { AdminUser } from '../../../redux/reducers/admin/userVerify';
import * as TYPE from '../../../redux/actions';
import Radio from 'antd/es/radio';
import Button from 'antd/es/button';

export interface UserVerifyProps {
  data: AdminUser['items'];
  statusChange(username: string, state: 2 | 3): { type: string; username: string; state: 2 | 3 };
  isSubmitting: boolean;
  stateChangeSubmit: () => { type: string };
}

class UserVerify extends React.Component<UserVerifyProps> {
  renderOperation = (record: any) => {
    return (
      <React.Fragment>
        {/* tslint:disable-next-line:jsx-no-lambda */}
        <Radio.Group onChange={e => this.props.statusChange(record.name, e.target.value)}>
          <Radio value={1}>通过</Radio>
          <Radio value={0}>拒绝</Radio>
        </Radio.Group>
      </React.Fragment>
    );
  };

  sortByPendingState(u1: any, u2: any) {
    return u1.verifyState - u2.verifyState;
  }

  render() {
    const Column = Table.Column;
    return (
      <React.Fragment>
        <Table
          scroll={{ x: 700 }}
          pagination={{ pageSize: 20 }}
          dataSource={this.props.data}
          rowKey="name"
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
            sorter={this.sortByPendingState}
            // tslint:disable-next-line:jsx-no-lambda
            render={status => (status === 3 ? '已通过' : status === 2 ? '未通过' : '审核中')}
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
  return {
    isSubmitting: state.admin.userState.isSubmitting,
    data: state.admin.users.items,
  };
};

export default connect(mapStateToProps, {
  statusChange(username: string, state: 2 | 3) {
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
