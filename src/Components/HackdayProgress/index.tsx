import * as React from 'react';

import Steps from 'antd/lib/steps';
import Card from 'antd/lib/card';

import 'antd/lib/card/style/index.css';
import 'antd/lib/steps/style/index.css';

import cls from '../Status/style.less';

const HackdayProgress = () => {
  return (
    <Card bordered={false} type="inner" >
      {/* <div style={{ height: '20px' }}/> */}
      <h1 className={cls['status-title']}>比赛进程</h1>
      <Steps progressDot={true} direction="vertical">
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
        <Steps.Step title="2018/5/1 停止报名"/>
      </Steps>
    </Card>
  );
};

export default HackdayProgress;
