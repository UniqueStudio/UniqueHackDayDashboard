import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

// import cls from '../Status/style.less';

const HackdayProgress = () => {
  return (
    <Card bordered={false} title="比赛进程">
      <Steps progressDot={true} direction="vertical">
        <Steps.Step title="2018/4/10 开始报名" />
        <Steps.Step title="2018/5/25 停止报名" />
        <Steps.Step title="2018/6/2 ～ 2018/6/2 比赛" />
      </Steps>
    </Card>
  );
};

export default HackdayProgress;
