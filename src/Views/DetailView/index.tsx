import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import throttle from 'lodash-es/throttle';

import Form from 'antd/es/form';
import Card from 'antd/es/card';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import DatePicker from 'antd/es/date-picker';
import Tabs from 'antd/es/tabs';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import 'antd/lib/form/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';

class DetailView extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
      required: true,
    };
    return (
      <Card bordered={false} className="detail">
        <Form>
          <Form.Item {...formItemLayout} label="真实姓名:">
            <Input
              placeholder="请输入真实姓名"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="性别:">
            <Select placeholder="请选择性别">
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...formItemLayout} label="出生日期">
            <DatePicker />
          </Form.Item>
          <Form.Item {...formItemLayout} label="手机号码:">
            <Input
              placeholder="请输入你的手机号码"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="T-shirt尺寸:">
            <Select placeholder="请选择尺寸">
              <Select.Option value="XS">XS</Select.Option>
              <Select.Option value="S">S</Select.Option>
              <Select.Option value="M">M</Select.Option>
              <Select.Option value="L">L</Select.Option>
              <Select.Option value="XL">XL</Select.Option>
              <Select.Option value="XXL">XXL</Select.Option>
              <Select.Option value="XXXL">XXXL</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...formItemLayout} label="所在城市:">
            <Input
              placeholder="请输入你所在的城市"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="支付宝:">
            <Input
              placeholder="请输入你的支付宝账号，报销时用"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="学校:">
            <Input
              placeholder="请输入你所在的大学"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="专业:">
            <Input
              placeholder="请输入你就读的专业"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="年级:">
            <Select placeholder="请选择年级">
              <Select.Option value="1">大一</Select.Option>
              <Select.Option value="2">大二</Select.Option>
              <Select.Option value="3">大三</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...formItemLayout} label="紧急联系人姓名:">
            <Input
              placeholder="请输入你的紧急联系人姓名"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="紧急联系人电话:">
            <Input
              placeholder="请输入你的紧急联系人电话"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="与紧急联系人关系:">
            <Input
              placeholder="请输入你的紧急联系人电话"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default DetailView;
