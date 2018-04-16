import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

// import cls from '../Status/style.less';

const HackdayProgress = () => {
  return (
    <Card bordered={false} title="比赛进程">
      <Steps progressDot={true} direction="vertical">
        <Steps.Step title="2018/4/17 开始报名" />
        <Steps.Step title="2018/5/19 确认是否参赛" />
        <Steps.Step title="2018/5/20 停止报名" />
        <Steps.Step title="2018/6/2 开幕式，hackday 比赛开始" />
        <Steps.Step title="2018/6/3 hackday 提交，评分，闭幕式&颁奖" />
      </Steps>
    </Card>
  );
};

export default HackdayProgress;
