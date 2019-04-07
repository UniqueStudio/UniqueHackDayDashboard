import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

// import cls from '../Status/style.less';

const HackdayProgress = () => {
  return (
    <Card bordered={false} title="比赛进程">
      <Steps progressDot={true} direction="vertical">
        <Steps.Step title="2019/4/17" description="开始报名" />
        <Steps.Step title="2019/5/20" description="停止报名" />
        <Steps.Step title="2019/5/25" description="确认是否参赛" />
        <Steps.Step title="2019/6/1" description="开幕式，Hackday 比赛开始" />
        <Steps.Step title="2019/6/2" description="作品提交，评分，闭幕式&颁奖" />
      </Steps>
    </Card>
  );
};

export default HackdayProgress;
