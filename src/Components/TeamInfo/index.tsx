// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';

import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import Card from 'antd/es/card';
import Table from 'antd/es/table';
import Button from 'antd/es/button';
import Popconfirm from 'antd/es/popconfirm';

import cls from './style.less';
import { RootState } from '../../redux/reducers/index';
import { TeamInfo } from '../../redux/reducers/teamInfo';
import * as TYPE from '../../redux/actions';
// import withLoading from '../../lib/withLoading';
import noop from 'lodash-es/noop';
import { replace } from 'connected-react-router';

const Description = DescriptionList.Description;

export interface TeamInfoProps {
  showEditButton: boolean;
  showTeamLeaderOperate: boolean;
  showMemberOperate: boolean;
  showDissolutionButton: boolean;

  teamInfo: TeamInfo;
  user: API.User.UserInfo;
  selfUsername: string;

  dissolutionTeam: () => void;
  exitTeam: () => void;
  changeTeamLeader: (targetUsername: string) => void;
  deleteMembers: (username: string) => void;
  toEditTeam: () => void;
}

const TeamInfo = (props: TeamInfoProps) => {
  const members = [props.teamInfo.teamLeader, ...props.teamInfo.members];
  const data = members.map((member, i) => ({
    key: member.username || i,
    name: member.name,
    username: member.username,
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
  } = props;

  const renderTable = () => {
    const { Column } = Table;
    const renderTeamLeaderOperate = (user: any) =>
      user.isTeamLeader ? (
        false
      ) : (
        <span>
          <Popconfirm
            title={
              <p>
                这会使你成为队员，该用户成为
                <br />
                队长，该用户会收到一个消息通知
              </p>
            }
            okText="确定"
            cancelText="取消"
            onConfirm={props.changeTeamLeader.bind(null, user.username)}
          >
            <a onClick={noop}>设为队长</a>
          </Popconfirm>
          <span style={{ display: 'inline-block', width: '20px' }} />
          <Popconfirm
            title={
              <p>
                这会使从队伍中移出该队员，
                <br />
                他本人会收到消息通知
              </p>
            }
            okText="确定"
            cancelText="取消"
            onConfirm={props.deleteMembers.bind(null, user.username)}
          >
            <a onClick={noop}>移除</a>
          </Popconfirm>
        </span>
      );

    const renderMemberOperate = (user: any) =>
      user.isSelf && (
        <span>
          <Popconfirm
            title={
              <p>
                这会使你退出这个队伍，只
                <br />
                有队长会收到消息通知
              </p>
            }
            okText="确定"
            cancelText="取消"
            onConfirm={props.exitTeam}
          >
            <a>退出队伍</a>
          </Popconfirm>
        </span>
      );

    const hasTeam = props.user.teamId !== null || undefined;

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
          render={(is: boolean | null) =>
            hasTeam ? (is === null ? '审核中' : is ? '已通过' : '未通过') : '尚未组队'
          }
        />
        <Column title="学校" dataIndex="school" key="school" />
        {/*tslint:disable-next-line:jsx-no-multiline-js */}
        {showTeamLeaderOperate && (
          <Column title="操作" key="teamLeaderOperating" render={renderTeamLeaderOperate} />
        )}
        {showMemberOperate && (
          <Column title="操作" key="MemberOperating" render={renderMemberOperate} />
        )}
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
        {showEditButton && (
          <Button
            onClick={props.toEditTeam}
            children="编辑成员"
            className={cls['team-info-edit-btn']}
          />
        )}
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
      {showDissolutionButton && (
        <Popconfirm
          title={
            <p>
              解散队伍会使所有队员及
              <br />
              队长变为<b>暂未组队</b>状态
            </p>
          }
          okText="确定"
          cancelText="取消"
          onConfirm={props.dissolutionTeam.bind(null, props.user.teamId)}
        >
          <Button href="" children="解散队伍" type="danger" />
        </Popconfirm>
      )}
    </Card>
  );
};

export { TeamInfo };

// export default withLoading({ isLoadingTeamInfo: { start: '', end: '' } })(
export default connect(
  ({ teamInfo, user: { username }, user, route }: RootState) => {
    const showEditButton = route && route.location && route.location.pathname !== '/team';
    const isTeamLeader = teamInfo.teamLeader.username === username;
    return {
      selfUsername: username,
      teamInfo,
      showTeamLeaderOperate: isTeamLeader && !showEditButton,
      showMemberOperate: !isTeamLeader && !showEditButton,
      showDissolutionButton: isTeamLeader && !showEditButton,
      showEditButton,
      user,
    };
  },
  dispatch => ({
    toEditTeam() {
      dispatch(replace('/team'));
    },

    dissolutionTeam() {
      dispatch({ type: TYPE.DELETE_TEAM._ });
    },
    exitTeam() {
      dispatch({ type: TYPE.EXIT_TEAM._ });
    },
    changeTeamLeader(targetUsername: string) {
      dispatch({ type: TYPE.CHANGE_TEAM_LEADER._, payload: targetUsername });
    },
    deleteMembers(username: string) {
      dispatch({ type: TYPE.DELETE_TEAM_MEMBER._, payload: username });
    },
  }),
)(TeamInfo);
