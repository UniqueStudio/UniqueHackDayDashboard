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
  renderOperation(record: any) {
    return (
      <span>
<<<<<<< HEAD
        {/* tslint:disable-next-line:jsx-no-lambda */}
=======
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
        <Radio.Group onChange={e => this.props.statusChange(record.name, e.target.value)}>
          <Radio.Button value={3}>通过</Radio.Button>
          <Radio.Button value={2}>不通过</Radio.Button>
        </Radio.Group>
      </span>
    );
  }
  render() {
    const Column = Table.Column;
    return (
      <React.Fragment>
        <Table
          scroll={{ x: 550 }}
          pagination={{ pageSize: 20 }}
          dataSource={this.props.data}
          rowKey="name"
        >
          <Column
            title="角色"
            dataIndex="isLeader"
            key="role"
<<<<<<< HEAD
            // tslint:disable-next-line:jsx-no-lambda
=======
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
            render={isLeader => (isLeader ? '队长' : '队员')}
          />
          <Column title="姓名" dataIndex="name" key="name" />
          <Column
            title="审核状态"
            dataIndex="verifyState"
            key="status"
<<<<<<< HEAD
            // tslint:disable-next-line:jsx-no-lambda
=======
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
            render={status => (status === 3 ? '已通过' : status === 2 ? '未通过' : '审核中')}
          />
          <Column title="学校" dataIndex="school" key="school" />
          <Column title="城市" dataIndex="city" key="city" />
          <Column title="年级" dataIndex="grade" key="grade" />
          <Column
            title="简历"
            dataIndex="resume"
            key="resume"
<<<<<<< HEAD
            // tslint:disable-next-line:jsx-no-lambda tslint:disable-next-line: jsx-no-multiline-js
=======
>>>>>>> 650e4e6cc98759f7ec25ec364b121508f31770df
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
