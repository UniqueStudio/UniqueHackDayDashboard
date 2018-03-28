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
import Submit from '../../lib/MyForm/Submit';

export interface DetailFormProps {
  onFormChange: (keyValue: { [k: string]: any }) => any;
  onSubmit: () => any;

  detailData: {
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
  };
}

class DetailForm extends React.Component<DetailFormProps & FormComponentProps> {
  render() {
    return (
      <MyForm
        data={this.props.detailData}
        onFormChange={this.props.onFormChange}
        onSubmit={this.props.onSubmit}
        isSubmitting={false}
      >
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
        <TextArea
          required={false}
          id="specialNeeds"
          fieldName="特殊需要"
          label="特殊需要"
          rows={4}
        />
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

        <Submit title="提交" />
      </MyForm>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      detailData: state.detail,
    };
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
