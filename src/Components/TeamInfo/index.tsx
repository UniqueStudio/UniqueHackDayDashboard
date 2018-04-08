// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';

import DescriptionList from 'ant-design-pro/es/DescriptionList';
import Card from 'antd/es/card';
import Table from 'antd/es/table';
import Button from 'antd/es/button';

import cls from './style.less';
import { RootState } from '../../redux/reducers/index';
import { TeamInfo } from '../../redux/reducers/teamInfo';

const Description = DescriptionList.Description;

export interface TeamInfoProps {
  hasEditButton?: boolean;
  hasOperatingButton?: boolean;
  hasDissolutionButton?: boolean;
  onOperating?: (userInfo: any, operate: 'setTeamLeader' | 'remove') => void;

  teamInfo: TeamInfo;
}

const TeamInfo = (props: TeamInfoProps) => {
  // const data = [
  // {
  // key: '2142jk5h34jbj3b5njuhtbn5egukhjb',
  // name: '洪志远',
  // isTeamLeader: true,
  // isAccepted: true,
  // school: '华中科技大学',
  //   },
  //   {
  //     key: '124话永泰花苑4号图👬uyghu',
  //     name: '梁志博',
  //     isTeamLeader: false,
  //     isAccepted: true,
  //     school: '华中科技大学',
  //   },
  // ];

  const members = [props.teamInfo.teamLeader, ...props.teamInfo.members];
  const data = members.map((member, i) => ({
    key: member.email || member.username || i,
    name: member.name,
    isTeamLeader: props.teamInfo.teamLeader
      ? props.teamInfo.teamLeader.username === member.username
      : false,
    isAccepted: member.isAccepted,
    school: member.school,
  }));

  const {
    hasEditButton = true,
    hasOperatingButton = true,
    hasDissolutionButton = false,
    // tslint:disable-next-line:no-empty
    onOperating = () => {},
  } = props;

  const renderTable = () => {
    const { Column } = Table;
    const renderOperatingButtons = (user: any) =>
      user.isTeamLeader ? (
        false
      ) : (
        <span>
          <a onClick={onOperating.bind({}, data, 'setTeamLeader')}>设为队长</a>
          <span style={{ display: 'inline-block', width: '20px' }} />
          <a onClick={onOperating.bind({}, data, 'remove')}>移除</a>
        </span>
      );
    return (
      <Table
        dataSource={data}
        pagination={false}
        scroll={{ x: hasOperatingButton ? '500px' : '400px' }}
      >
        <Column
          title="角色"
          dataIndex="isTeamLeader"
          key="role"
          // tslint:disable-next-line:jsx-no-lambda
          render={(is: boolean) => (is ? '队长' : '队员')}
        />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column
          title="审核状态"
          dataIndex="isAccepted"
          key="status"
          // tslint:disable-next-line:jsx-no-lambda
          render={(is: boolean) => (is ? '已通过' : '未通过')}
        />
        <Column title="学校" dataIndex="school" key="school" />
        {/*tslint:disable-next-line:jsx-no-multiline-js */}
        {hasOperatingButton && (
          <Column title="操作" key="operating" render={renderOperatingButtons} />
        )}
      </Table>
    );
  };

  const renderDivider = () => {
    return <div style={{ height: '16px' }} />;
  };

  const membersCount = props.teamInfo.members ? props.teamInfo.members.length : '-';
  const teamUpTime = props.teamInfo.createdTime
    ? new Date(props.teamInfo.createdTime * 1000).toLocaleString()
    : '-';

  return (
    <Card bordered={false} title="队伍信息">
      <div className={cls['team-info-title-wrapper']}>
        {hasEditButton && <Button children="编辑成员" className={cls['team-info-edit-btn']} />}
      </div>
      <DescriptionList layout={'horizontal'} title="" col={2}>
        <Description term="队伍名称" children={props.teamInfo.teamName || '-'} />
        <Description term="队伍人数" children={membersCount} />
        <Description term="获奖情况" children={props.teamInfo.prizeInfo || '-'} />
        <Description term="组队时间" children={teamUpTime} />
      </DescriptionList>
      {renderDivider()}
      {renderTable()}
      {renderDivider()}
      {hasDissolutionButton && <Button children="解散队伍" type="danger" />}
    </Card>
  );
};

export default connect(({ teamInfo }: RootState) => ({ teamInfo }))(TeamInfo);
