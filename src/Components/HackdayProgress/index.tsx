import * as React from 'react';

import Steps from 'antd/es/steps';
import Card from 'antd/es/card';

// import cls from '../Status/style.less';

const HackdayProgress = () => {
    return (
        <Card bordered={false} title="比赛进程">
            <Steps progressDot={true} direction="vertical">
                <Steps.Step title="5月7日" description="开始报名" />
                <Steps.Step title="5月7日 - 5月30日" description="筛选简历" />
                <Steps.Step title="5月30日" description="停止报名" />
                <Steps.Step title="6月1日 - 6月2日" description="确认是否参赛" />
                <Steps.Step title="6月8日" description="开幕式&开始比赛" />
                <Steps.Step title="6月9日" description="结束比赛&答辩&颁奖仪式" />
            </Steps>
        </Card>
    );
};

export default HackdayProgress;
