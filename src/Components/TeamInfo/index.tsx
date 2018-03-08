import * as React from 'react';

// import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';

import 'antd/lib/card/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/button/style/index.css';
// import Icon from 'antd/lib/icon';

import cls from './style.less';

const Description = DescriptionList.Description;
const tableColumns = [
  {
    title: '角色',
    dataIndex: 'isTeamLeader',
    key: 'role',
    render: (leader: boolean) => leader ? '队长' : '队员',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '审核状态',
    dataIndex: 'accepted',
    key: 'checkStatus',
    render: (accepted: boolean) => accepted ? '已通过' : '未通过',
  },
  {
    title: '学校',
    key: 'school',
    dataIndex: 'school',
  },
];

const TeamInfo = () => {
  const data = [
    {
      key: '2142jk5h34jbj3b5njuhtbn5egukhjb',
      name: '梁志博',
      isTeamLeader: true,
      accepted: true,
      school: '华中科技大学',
    },
  ];

  const renderTable = () => {
    return (
      <Table
        columns={tableColumns}
        dataSource={data}
        pagination={false}
        scroll={{x: '400px'}}
      />
    );
  };

  const renderDivider = () => {
    return <div style={{ height: '16px' }}/>;
  };

  return (
    <Card bordered={false} type="inner">
      <div className={cls['team-info-title-wrapper']}>
        <h1 className={cls['team-info-title']}>队伍信息</h1>
        <Button children="编辑成员" type="primary"/>
      </div>
      <DescriptionList layout={'horizontal'} title="">
        <Description term="队长" children="梁志博"/>
        <Description term="队伍人数" children="4"/>
        <Description term="获奖情况" children="—"/>
        <Description term="组队时间" children={new Date(Date.now()).toLocaleDateString()}/>
      </DescriptionList>
      {renderDivider()}
      {renderTable()}
      {renderDivider()}
    </Card>
  );
};

export default TeamInfo;
