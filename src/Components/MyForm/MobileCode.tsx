// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import { patterns } from '../../lib/patterns';

export interface MobileCodeProps {
    isReady?: boolean;
    isSending?: boolean;
    validateFileds?: string[];

    onSend: () => Promise<any>;
}

export default class MobileCode extends React.Component<MobileCodeProps> {
    state = {
        count: 0,
    };

    timer = 0;

    reallyRequestSMS = async () => {
        const { form } = this.context;
        const { validateFileds = ['phone'] } = this.props;

        const err = await new Promise(resolve => {
            form.validateFields(validateFileds, resolve);
        });

        if (err) {
            return;
        }

        let count = 59;
        await this.props.onSend();
        this.setState({ count });
        this.timer = window.setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    };

    render() {
        const {
            form: { getFieldDecorator },
        } = this.context;
        const { count } = this.state;
        return (
            <Form.Item hasFeedback={false}>
                <Row gutter={8}>
                    <Col span={16}>
                        {getFieldDecorator('code', {
                            rules: [
                                { required: true, message: '必须输入验证码' },
                                { pattern: patterns.code, message: '验证码格式不正确' },
                            ],
                        })(
                            <Input
                                size="large"
                                placeholder="请输入短信验证码"
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                            />,
                        )}
                    </Col>
                    <Col span={8}>
                        <Button
                            style={{ width: '100%' }}
                            size="large"
                            disabled={
                                !!this.state.count || this.props.isReady || this.props.isSending
                            }
                            onClick={this.reallyRequestSMS}
                        >
                            {this.props.isSending ? (
                                <Icon type="loading" />
                            ) : !this.props.isReady ? (
                                count ? (
                                    `${count} s`
                                ) : (
                                    '获取验证码'
                                )
                            ) : (
                                '正在加载'
                            )}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        );
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    static contextTypes = {
        form: PropTypes.object,
    };
}
