// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
// import throttle from 'lodash-es/throttle';

import Form, { FormComponentProps } from 'antd/es/form';
import AntdSelect from 'antd/es/select';

import { patterns } from '../../lib/patterns';
import MyForm from '../../lib/MyForm/MyForm';
import Text from '../../lib/MyForm/Text';
import TextArea from '../../lib/MyForm/TextArea';
import DatePicker from '../../lib/MyForm/DatePicker';
import Select from '../../lib/MyForm/Select';
import File from '../../lib/MyForm/File';

export interface DetailFormProps {
  onFormChange: (keyValue: { [k: string]: any }) => any;
  onSubmit: () => any;

  name: any;
  gender: any;
  birthday: any;
  email: any;
  resume: any;
  tShirtSize: any;
  city: any;
  alipay: any;
  school: any;
  major: any;
  grade: any;
  graduateTime: any; // 年月日
  urgentConcatName: any;
  urgentConcatPhone: any;
  urgentConcatRelationship: any;

  collections?: any;
  specialNeeds?: any;
  github?: any;
  linkedIn?: any;
  codeingDotNet?: any;
  blog?: any;

  role: any; // 产品，设计，前端，后端，机器学习，硬件开发，其他
  skills: any;
  hackdayTimes: number;
}

class DetailForm extends React.Component<DetailFormProps & FormComponentProps> {
  state = {
    isUploadingResume: false,
    isUploadingCollection: false,
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any) => {
      if (!err) {
        this.props.onSubmit();
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <MyForm data={{}}>
        <Text required={true} id="name" fieldName="姓名" label="姓名" />
        <Select required={true} id="gender" fieldName="性别" label="性别">
          <AntdSelect.Option value="男">男</AntdSelect.Option>
          <AntdSelect.Option value="女">女</AntdSelect.Option>
          <AntdSelect.Option value="其他">其他</AntdSelect.Option>
        </Select>
        <DatePicker id="birthday" label="生日" required={true} fieldName="生日" />
        <Text required={true} id="email" fieldName="邮箱" label="邮箱" />
        <Select required={true} id="tShirtSize" fieldName="T-shirt尺寸" label="T-shirt尺寸">
          <AntdSelect.Option value="XS">XS</AntdSelect.Option>
          <AntdSelect.Option value="S">S</AntdSelect.Option>
          <AntdSelect.Option value="M">M</AntdSelect.Option>
          <AntdSelect.Option value="L">L</AntdSelect.Option>
          <AntdSelect.Option value="XL">XL</AntdSelect.Option>
          <AntdSelect.Option value="XXL">XXL</AntdSelect.Option>
          <AntdSelect.Option value="XXXL">XXXL</AntdSelect.Option>
        </Select>
        <Text required={true} id="city" fieldName="所在城市" label="所在城市" />
        <Text required={true} id="alipay" fieldName="报销收款支付宝" label="支付宝" />
        <Text required={true} id="school" fieldName="学校" label="学校" />
        <Text required={true} id="marjor" fieldName="专业" label="专业" />
        <Select required={true} id="grade" fieldName="年级" label="年级">
          <AntdSelect.Option value="大一">大一</AntdSelect.Option>
          <AntdSelect.Option value="大二">大二</AntdSelect.Option>
          <AntdSelect.Option value="大三">大三</AntdSelect.Option>
          <AntdSelect.Option value="大四">大四</AntdSelect.Option>
          <AntdSelect.Option value="研一">研一</AntdSelect.Option>
          <AntdSelect.Option value="研二">研二</AntdSelect.Option>
          <AntdSelect.Option value="研三">研三</AntdSelect.Option>
          <AntdSelect.Option value="博士">博士</AntdSelect.Option>
        </Select>
        <DatePicker id="graduateTime" label="毕业时间" required={true} fieldName="毕业时间" />
        <Text
          required={true}
          id="urgentConcatName"
          fieldName="紧急联系人姓名"
          label="紧急联系人姓名"
        />
        <Text
          pattern={patterns.phone}
          required={true}
          id="urgentConcatPhone"
          fieldName="紧急联系人电话"
          label="紧急联系人电话"
        />
        <Text
          required={true}
          id="urgentConcatRelationship"
          fieldName="与紧急联系人关系"
          label="与紧急联系人关系"
        />
        <Text required={true} id="name" fieldName="姓名" label="姓名" />
        <TextArea required={false} id="name" fieldName="姓名" label="姓名" rows={4} />
        <Text required={false} id="github" fieldName="Github" label="Github" />
        <Text required={false} id="linkedIn" fieldName="LinkedIn" label="LinkedIn" />
        <Text required={false} id="codingDotNet" fieldName="Coding.Net" label="Coding.Net" />
        <Text required={false} id="blog" fieldName="个人博客" label="个人博客" />
        <Select required={true} id="roles" fieldName="角色" label="角色">
          <AntdSelect.Option value="前端">前端</AntdSelect.Option>
          <AntdSelect.Option value="产品">产品</AntdSelect.Option>
          <AntdSelect.Option value="设计">设计</AntdSelect.Option>
          <AntdSelect.Option value="后端">后端</AntdSelect.Option>
          <AntdSelect.Option value="机器学习">机器学习</AntdSelect.Option>
          <AntdSelect.Option value="硬件开发">硬件开发</AntdSelect.Option>
          <AntdSelect.Option value="其他">其他</AntdSelect.Option>
        </Select>

        <Select required={true} id="skills" fieldName="技能" label="技能">
          <AntdSelect.Option value="JavaScript">JavaScript</AntdSelect.Option>
          <AntdSelect.Option value="CSS/HTML">CSS/HTML</AntdSelect.Option>
          <AntdSelect.Option value="Swift">Swift</AntdSelect.Option>
          <AntdSelect.Option value="Object-C">Object-C</AntdSelect.Option>
          <AntdSelect.Option value="Kotlin">Kotlin</AntdSelect.Option>
          <AntdSelect.Option value="Erlang">Erlang</AntdSelect.Option>
          <AntdSelect.Option value="Python">Python</AntdSelect.Option>
          <AntdSelect.Option value="Golang">Golang</AntdSelect.Option>
          <AntdSelect.Option value="C/C++">C/C++</AntdSelect.Option>
          <AntdSelect.Option value="C#">C#</AntdSelect.Option>
          <AntdSelect.Option value="Java">Java</AntdSelect.Option>
          <AntdSelect.Option value="PHP">PHP</AntdSelect.Option>
          <AntdSelect.Option value="Ruby">Ruby</AntdSelect.Option>
          <AntdSelect.Option value="Sketch">Sketch</AntdSelect.Option>
          <AntdSelect.Option value="PhotoShop">PhotoShop</AntdSelect.Option>
          <AntdSelect.Option value="Axure">Axure</AntdSelect.Option>
        </Select>

        <TextArea
          required={false}
          id="hackdayTimes"
          fieldName="参加过的hackday"
          label="参加过的hackday"
          rows={4}
        />

        <File id="resume" required={true} fieldName="你的简历" label="你的简历" />
        <File id="collection" required={false} fieldName="你的作品集" label="你的作品集" />
      </MyForm>
    );
  }
}

export default connect(
  (state: RootState) => {
    return state.detail;
  },
  dispatch => ({
    onFormChange(value: any) {
      dispatch({
        type: 'DETAIL_FORM_CHANGE',
        payload: value,
      });
    },
    onSubmit() {
      dispatch({ type: 'DETAIL_FORM_SUBMIT' });
    },
  }),
)(
  Form.create<DetailFormProps>({
    onFieldsChange(props, value) {
      props.onFormChange(value as any);
    },
    mapPropsToFields(props) {
      return Object.keys(props).reduce(
        (p, key) => ({
          ...p,
          [key]: Form.createFormField((props as any)[key]),
        }),
        {},
      );
    },
  })(DetailForm),
);

{
  /* <Form onSubmit={this.handleSubmit} className="detail" style={{ marginTop: '20px' }}>
        <Form.Item {...formItemLayout} label="真实姓名:">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入真实姓名',
              },
            ],
          })(
            <Input
              placeholder="请输入真实姓名"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="性别:">
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: '请选择性别',
              },
            ],
          })(
            <Select placeholder="请选择性别">
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="出生日期">
          {getFieldDecorator('birthday', {
            rules: [
              {
                required: true,
                message: '请输入出生日期',
              },
            ],
          })(<DatePicker />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="邮箱:">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: '请输入邮箱',
              },
              {
                pattern: patterns.email,
                message: '邮箱不合法',
              },
            ],
          })(
            <Input
              placeholder="请输入邮箱"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="T-shirt尺寸:">
          {getFieldDecorator('tShirtSize', {
            rules: [
              {
                required: true,
                message: '请输入T-shirt尺寸:',
              },
            ],
          })(
            <Select placeholder="请选择尺寸">
              <Select.Option value="XS">XS</Select.Option>
              <Select.Option value="S">S</Select.Option>
              <Select.Option value="M">M</Select.Option>
              <Select.Option value="L">L</Select.Option>
              <Select.Option value="XL">XL</Select.Option>
              <Select.Option value="XXL">XXL</Select.Option>
              <Select.Option value="XXXL">XXXL</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="所在城市:">
          {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: '请输入你所在城市',
              },
            ],
          })(
            <Input
              placeholder="请输入你所在的城市"
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="支付宝:">
          {getFieldDecorator('alipay', {
            rules: [
              {
                required: true,
                message: '请输入真实支付宝账号',
              },
            ],
          })(
            <Input
              placeholder="请输入你的支付宝账号，报销时用"
              prefix={<Icon type="alipay" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="学校:">
          {getFieldDecorator('school', {
            rules: [
              {
                required: true,
                message: '请输入你所在学校',
              },
            ],
          })(
            <Input
              placeholder="请输入你所在的大学"
              prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="专业:">
          {getFieldDecorator('major', {
            rules: [
              {
                required: true,
                message: '请输入你就读的专业',
              },
            ],
          })(
            <Input
              placeholder="请输入你就读的专业"
              prefix={<Icon type="desktop" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="年级:">
          {getFieldDecorator('grade', {
            rules: [
              {
                required: true,
                message: '请选择你的年级',
              },
            ],
          })(
            <Select placeholder="请选择年级">
              <Select.Option value="1">大一</Select.Option>
              <Select.Option value="2">大二</Select.Option>
              <Select.Option value="3">大三</Select.Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="毕业时间">
          {getFieldDecorator('graduateTime', {
            rules: [
              {
                required: true,
                message: '请输入毕业时间',
              },
            ],
          })(<DatePicker />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="紧急联系人姓名:">
          {getFieldDecorator('urgentConcatName', {
            rules: [
              {
                required: true,
                message: '请输入紧急联系人姓名',
              },
            ],
          })(
            <Input
              placeholder="输入紧急联系人姓名"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="紧急联系人电话:">
          {getFieldDecorator('urgentConcatPhone', {
            rules: [
              {
                required: true,
                message: '请输入紧急联系人电话',
              },
              {
                pattern: patterns.phone,
                message: '不是有效的电话号码',
              },
            ],
          })(
            <Input
              placeholder="输入紧急联系人电话"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="与紧急联系人关系:">
          {getFieldDecorator('urgentConcatRelationship', {
            rules: [
              {
                required: true,
                message: '请输入你与紧急联系人关系',
              },
            ],
          })(
            <Input
              placeholder="输入你和紧急联系人关系"
              prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="特殊需要:">
          {getFieldDecorator('specialNeeds', {
            rules: [
              {
                pattern: /[\u4e00-\u9fa5]{5,}/,
                message: '请输入至少五个汉字',
              },
            ],
          })(<Input.TextArea placeholder="在饮食、出行等方面的特殊需要" rows={4} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Github:">
          {getFieldDecorator('github', {
            rules: [
              {
                message: '请输入真实姓名',
              },
            ],
          })(
            <Input
              placeholder="输入你的 Github 账号"
              prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} required={false} label="LinkedIn:">
          {getFieldDecorator('linkedIn', {
            rules: [
              {
                message: '请输入真实姓名',
              },
            ],
          })(
            <Input
              placeholder="输入你的 LinkedIn 账号"
              prefix={<Icon type="linkedin" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} required={false} label="Coding.Net:">
          {getFieldDecorator('codingDotNet', {
            rules: [
              {
                message: '请输入真实姓名',
              },
            ],
          })(
            <Input
              placeholder="输入你的 Coding.Net 账号"
              prefix={<Icon type="laptop" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} required={false} label="个人博客">
          {getFieldDecorator('blog', {
            rules: [
              {
                message: '请输入真实姓名',
              },
            ],
          })(
            <Input
              placeholder="输入你的个人博客的地址"
              prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="你的角色:">
          {getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: '请输入你担任的角色',
              },
            ],
          })(
            <Select placeholder="请选择你的角色" mode="multiple">
              <Select.Option value="前端">前端</Select.Option>
              <Select.Option value="产品">产品</Select.Option>
              <Select.Option value="设计">设计</Select.Option>
              <Select.Option value="后端">后端</Select.Option>
              <Select.Option value="机器学习">机器学习</Select.Option>
              <Select.Option value="硬件开发">硬件开发</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="你的技能:">
          {getFieldDecorator('skills', {
            rules: [
              {
                required: true,
                message: '请输入真实姓名',
              },
            ],
          })(
            <Select placeholder="请选择你的技能" mode="multiple">
              <Select.Option value="C/C++">C/C++</Select.Option>
              <Select.Option value="PhotoShop">PhotoShop</Select.Option>
              <Select.Option value="JavaScript">JavaScript</Select.Option>
              <Select.Option value="Go">Go</Select.Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="参加过几次hackday">
          {getFieldDecorator('hackdayTimes', {})(
            <Input
              placeholder="参加过几次hackday"
              prefix={<Icon type="trophy" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          hasFeedback={false}
          // avoid flash when uploading
          validateStatus={this.state.isUploadingResume ? 'warning' : undefined}
          help={this.state.isUploadingResume ? '正在上传...' : undefined}
          label="上传你的简历"
        >
          {getFieldDecorator('resume', {
            rules: [
              {
                required: true,
                message: '请上传简历',
              },
            ],
            getValueFromEvent: this.eventToFileIdResume,
          })(
            <Upload multiple={false} name="resume" action="/v1/file/files" listType="picture">
              <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
                <Icon type="upload" /> 点击上传简历
              </Button>
            </Upload>,
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          hasFeedback={false}
          validateStatus={this.state.isUploadingCollection ? 'warning' : undefined}
          help={this.state.isUploadingCollection ? '正在上传...' : undefined}
          label="上传你的作品集"
        >
          {getFieldDecorator('collection', {
            getValueFromEvent: this.eventToFileIdCollection,
          })(
            <Upload multiple={false} name="collection" action="/v1/file/files" listType="picture">
              <Button style={{ color: 'rgba(0,0,0,0.5)' }}>
                <Icon type="upload" /> 点击上传作品集
              </Button>
            </Upload>,
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xl: { push: 4, span: 8 },
            lg: { push: 6, span: 10 },
            md: { push: 7, span: 12 },
            xs: 24,
            sm: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form> */
}
