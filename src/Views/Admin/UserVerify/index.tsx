// tslint:disable: jsx-no-multiline-js
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
import uniq from 'lodash/uniq';

export interface UserVerifyProps {
  dataSource: AdminUser['items'];
  statusChange: any;
  radios: any;
  isSubmitting: boolean;
  stateChangeSubmit: () => { type: string };
  isSuperAdmin: boolean;
}

class UserVerify extends React.Component<UserVerifyProps> {
  statusFilters = [
    { text: '审核中', value: '0' || '1' },
    { text: '未通过', value: '2' },
    { text: '已通过', value: '3' },
  ];

  renderOperation = (record: any) => {
    const handleChange = (e: any) => {
      const radioVal = e.target.value;
      if (e.target.value !== 2) {
        this.props.statusChange(radioVal, record.username, e.target.value);
      } else {
        this.props.statusChange(radioVal, record.username, undefined, true);
      }
    };

    const showRadio = record.verifyState !== 2 && record.verifyState !== 3;

    return (
      <Radio.Group onChange={handleChange} defaultValue={this.props.radios[record.username]}>
        {showRadio && (
          <React.Fragment>
            <Radio value={1}>通过</Radio>
            <Radio value={0}>拒绝</Radio>
            {this.props.isSuperAdmin && !record.inWaitList && <Radio value={2}>等待列表</Radio>}
          </React.Fragment>
        )}
      </Radio.Group>
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

  renderCurrentPass = (adminDict: any) => {
    const rejectList = uniq(adminDict[0]);
    const passList = uniq(adminDict[1]);
    const rejectLen = rejectList.length;
    const passLen = passList.length;

    return `${passLen}/${rejectLen + passLen}`;
  };

  renderFooter = () => {
    const dataSource = this.props.dataSource;

    const total = dataSource.length;
    // 审核中人数
    const pengdingNum = dataSource.filter(user => user.verifyState === 0 || user.verifyState === 1)
      .length;
    const rejectNum = dataSource.filter(user => user.verifyState === 2).length;
    const passNum = total - pengdingNum - rejectNum;

    return (
      <React.Fragment>
        <span>总数: {total}</span>
        {this.props.isSuperAdmin && this.renderSuperAdminFooter(passNum, pengdingNum, rejectNum)}
      </React.Fragment>
    );
  };

  collectionLink(url: string | undefined) {
    return url ? (
      <a href={url} target="_blank" rel="noopener">
        链接
      </a>
    ) : (
      '无'
    );
  }

  filterStatus(value: any, record: any) {
    return record.verifyState === +value;
  }

  renderStatus = (status: any, record: any) =>
    status === 3 ? (
      <Badge status="success" text="已通过" />
    ) : status === 2 ? (
      <Badge status="error" text="未通过" />
    ) : record.inWaitList ? (
      <Badge status="default" text="等待中" />
    ) : (
      <Badge status="processing" text="审核中" />
    );

  render() {
    const Column = Table.Column;
    const { dataSource } = this.props;

    return (
      <React.Fragment>
        <Table
          scroll={{ x: 700 }}
          pagination={{ pageSize: 10 }}
          dataSource={dataSource}
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
          {this.props.isSuperAdmin && (
            <Column
              title="当前通过"
              dataIndex="adminDict"
              key="currentPass"
              render={this.renderCurrentPass}
            />
          )}
          <Column
            title="审核状态"
            dataIndex="verifyState"
            key="status"
            render={this.renderStatus}
            filters={this.props.isSuperAdmin ? this.statusFilters : undefined}
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
          <Column
            title="作品集"
            dataIndex="collection"
            key="collection"
            render={this.collectionLink}
          />
          <Column title="操作" key="operate" render={this.renderOperation} />
        </Table>
        <Button
          type="primary"
          disabled={this.props.isSubmitting || this.props.dataSource.length === 0}
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
  const adminName = state.user.username as string;
  const data = state.admin.users.items;
  const superData = data;
  const normalData = superData.filter(
    user =>
      user.verifyState !== 2 &&
      user.verifyState !== 3 &&
      !user.adminDict[0].includes(adminName) &&
      !user.adminDict[1].includes(adminName),
  );

  const isSuperAdmin = state.user.permission === 2;
  const dataSource = isSuperAdmin ? superData : normalData;
  const radios = state.admin.userState.radios;

  return {
    isSubmitting: state.admin.userState.isSubmitting,
    dataSource,
    isSuperAdmin,
    radios,
  };
};

export default connect(mapStateToProps, {
  statusChange(radioVal: number, username: string, state: 0 | 1 | undefined, inWaitList?: boolean) {
    return {
      type: TYPE.ADMIN_USER_STATUS_CHANGE._,
      username,
      state,
      inWaitList,
      radioVal,
    };
  },
  stateChangeSubmit() {
    return {
      type: TYPE.ADMIN_USER_SUBMIT._,
    };
  },
})(UserVerify);
