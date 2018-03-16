import * as React from 'react';

// import Row from 'antd/es/row';
// import Col from 'antd/es/col';
// import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import Card from 'antd/es/card';
import Table from 'antd/es/table';
import Button from 'antd/es/button';

import 'antd/lib/card/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/button/style/index.css';
// import Icon from 'antd/es/icon';

import cls$2 from '../TeamInfo/style.less';
import cls from './style.less';

// const Description = DescriptionList.Description;

// export interface DeviceRentProps {
//   hasEditButton?: boolean;
//   hasOperatingButton?: boolean;
//   hasDissolutionButton?: boolean;
//   onOperating?: (userInfo: any, operate: 'setTeamLeader' | 'remove') => void;
// }

// const TeamInfo = (props: DeviceRentProps) => {
const DeviceRent = (props: any) => {
  const data = [
    {
      key: '2142jk5h34jbj3b5njuhtbn5egukhjb',
      deviceName: '树莓派',
      isReturned: true,
      rentTime: Date.now(),
      returnTime: Date.now(),
    },
    {
      key: 'sahjgsyhfgehsgvbeh54765',
      deviceName: '树莓派',
      isReturned: true,
      rentTime: Date.now(),
      returnTime: Date.now(),
    },
  ];

  // const {
  //   hasEditButton = true,
  //   hasOperatingButton = true,
  //   hasDissolutionButton = false,
  //   // tslint:disable-next-line:no-empty
  //   onOperating = () => {},
  // } = props;

  // const renderDivider = () => {
  //   return <div style={{ height: '16px' }}/>;
  // };
  const { Column } = Table;

  // const renderOperatingButtons = (device: any) => {
  //   <a onClick={}></a>
  // }

  return (
    <Card bordered={false} type="inner">
      <div className={cls$2['team-info-title-wrapper']}>
        <h1 className={cls$2['team-info-title']}>设备管理</h1>
      </div>
      <Table dataSource={data} pagination={false} scroll={{ x: '500px' }}>
        <Column title="设备名称" dataIndex="deviceName" key="name" />
        <Column title="状态" dataIndex="isReturned" key="status" />
        <Column title="租赁时间" dataIndex="rentTime" key="rentTime" />
        <Column title="归还时间" dataIndex="returnTime" key="returnTime" />
        {/* <Column title="操作" key="operating"/> */}
      </Table>
    </Card>
  );
};

export default DeviceRent;
