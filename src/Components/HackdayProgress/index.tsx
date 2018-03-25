import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

import cls from '../Status/style.less';

const HackdayProgress = () => {
  return (
    <Card bordered={false} title="比赛进程">
      <Steps progressDot={true} direction="vertical">
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
        <Steps.Step title="2018/5/1 停止报名" />
      </Steps>
    </Card>
  );
};

export default HackdayProgress;
