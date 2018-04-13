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
// import withLoading from '../../lib/withLoading';
import noop from 'lodash-es/noop';

const Description = DescriptionList.Description;

export interface TeamInfoProps {
  showEditButton: boolean;
  showTeamLeaderOperate: boolean;
  showMemberOperate: boolean;
  showDissolutionButton: boolean;
  // onOperating?: (userInfo: any, operate: 'setTeamLeader' | 'remove' | 'exitTeam') => void;

  // isLoadingTeamInfo: boolean;
  teamInfo: TeamInfo;
  selfUsername: string;
}

const TeamInfo = (props: TeamInfoProps) => {
  const members = [props.teamInfo.teamLeader, ...props.teamInfo.members];
  const data = members.map((member, i) => ({
    key: member.email || member.username || i,
    name: member.name,
    isTeamLeader: props.teamInfo.teamLeader
      ? props.teamInfo.teamLeader.username === member.username
      : false,
    isAccepted: member.isAccepted,
    school: member.school,
    isSelf: member.username === props.selfUsername,
  }));

  const {
    showEditButton = true,
    showDissolutionButton = false,
    showTeamLeaderOperate = false,
    showMemberOperate = false,
    // tslint:disable-next-line:no-empty
    // onOperating = () => {},
  } = props;

  const renderTable = () => {
    const { Column } = Table;
    const renderTeamLeaderOperate = (user: any) =>
      user.isTeamLeader ? (
        false
      ) : (
        <span>
          <a onClick={noop}>设为队长</a>
          <span style={{ display: 'inline-block', width: '20px' }} />
          <a onClick={noop}>移除</a>
        </span>
      );

    const renderMemberOperate = (user: any) =>
      user.isSelf && (
        <span>
          <a onClick={noop}>退出队伍</a>
        </span>
      );

    return (
      <Table
        dataSource={data}
        pagination={false}
        scroll={{ x: showEditButton ? '500px' : '400px' }}
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
        {showTeamLeaderOperate && (
          <Column title="操作" key="operating" render={renderTeamLeaderOperate} />
        )}
        {showMemberOperate && <Column title="操作" key="operating" render={renderMemberOperate} />}
      </Table>
    );
  };

  const renderDivider = () => {
    return <div style={{ height: '16px' }} />;
  };

  const membersCount = members ? members.length : '-';
  const teamUpTime = props.teamInfo.createdTime
    ? new Date(props.teamInfo.createdTime * 1000).toLocaleString()
    : '-';

  return (
    <Card bordered={false} title="队伍信息">
      <div className={cls['team-info-title-wrapper']}>
        {showEditButton && <Button children="编辑成员" className={cls['team-info-edit-btn']} />}
      </div>
      <DescriptionList layout={'horizontal'} title="" col={2}>
        <Description term="队伍名称" children={props.teamInfo.teamName || '-'} />
        <Description term="队伍人数" children={<span>{membersCount}</span>} />
        <Description term="获奖情况" children={props.teamInfo.prizeInfo || '-'} />
        <Description term="组队时间" children={teamUpTime} />
      </DescriptionList>
      {renderDivider()}
      {renderTable()}
      {renderDivider()}
      {showDissolutionButton && <Button children="解散队伍" type="danger" />}
    </Card>
  );
};

export { TeamInfo };

// export default withLoading({ isLoadingTeamInfo: { start: '', end: '' } })(
export default connect(({ teamInfo, user: { username }, route }: RootState) => {
  const showEditButton = route && route.location && route.location.pathname !== '/team';
  const isTeamLeader = teamInfo.teamLeader.username === username;
  return {
    selfUsername: username,
    teamInfo,
    showTeamLeaderOperate: isTeamLeader && !showEditButton,
    showMemberOperate: !isTeamLeader && !showEditButton,
    showDissolutionButton: isTeamLeader && !showEditButton,
    showEditButton,
  };
})(TeamInfo);
// );
