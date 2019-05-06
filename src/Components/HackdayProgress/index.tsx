import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

// import cls from '../Status/style.less';

const HackdayProgress = () => {
    return (
        <Card bordered={false} title="比赛进程">
            <Steps progressDot={true} direction="vertical">
                <Steps.Step title="2019/5/7" description="开始报名" />
                <Steps.Step title="2019/5/30" description="停止报名" />
                <Steps.Step title="2019/6/1" description="简历筛选结果公布，确认是否参赛" />
                <Steps.Step title="2019/6/8" description="开幕式&开始比赛" />
                <Steps.Step title="2019/6/9" description="结束比赛&答辩&颁奖仪式" />
            </Steps>
        </Card>
    );
};

export default HackdayProgress;
