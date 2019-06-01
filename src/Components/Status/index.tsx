import * as React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Icon from 'antd/es/icon';
// import Button from 'antd/es/button';

import cls from './style.less';

export interface StatusProps {
    icon: { type: string; color: string };
    statusText: string;
    confirmText?: string;
    buttons: React.ReactNode[];
}

const Status = (props: StatusProps) => {
    return (
        <Card bordered={false} type="inner" className={cls['status-card']}>
            <Row>
                <Col xs={24} sm={15} md={15}>
                    <div className={cls['icon-title-wrapper']}>
                        <Icon
                            className={cls['icon-success']}
                            type={`${props.icon.type}-circle`}
                            style={{ color: props.icon.color }}
                        />
                        <h1 className={cls['status-title']}>
                            当前状态: {props.statusText} {props.confirmText}
                        </h1>
                    </div>
                </Col>
                <Col xs={24} sm={9} md={9}>
                    <div className={cls['buttons-wrapper']}>
                        {/* // The reason we reverse this array is `float: right` is used. */}
                        {props.buttons.reverse()}
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default Status;
