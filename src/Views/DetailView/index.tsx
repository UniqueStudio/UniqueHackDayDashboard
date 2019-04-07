// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import AntdSelect from 'antd/es/select';
import Divider from 'antd/es/divider';
import Radio from 'antd/es/radio';

import { patterns } from '../../lib/patterns';
import MyForm from '../../Components/MyForm/MyForm';
import Text from '../../Components/MyForm/Text';
import TextArea from '../../Components/MyForm/TextArea';
import DatePicker from '../../Components/MyForm/DatePicker';
import Select from '../../Components/MyForm/Select';
import File from '../../Components/MyForm/File';
import Submit from '../../Components/MyForm/Submit';
import RadioGroup from '../../Components/MyForm/RadioGroup';

import { DetailForm } from '../../redux/reducers/forms';
import * as TYPE from '../../redux/actions/index';
// import { emailValidator } from '../../Components/MyForm/validators';

const SelectOption = AntdSelect.Option;

export interface DetailViewProps {
  onFormChange: (keyValue: { [k: string]: any }) => any;
  onSubmit: () => any;
  onEnter: () => void;

  detailData: DetailForm['data'];

  detailFormSubmitting: boolean;
  detailFormError: { value: string; time: number };
}

class DetailView extends React.Component<DetailViewProps> {
  render() {
    const {
      detailFormError,
      onSubmit,
      onFormChange,
      detailData,
      detailFormSubmitting,
    } = this.props;
    return (
      <div>
        <MyForm
          data={detailData}
          onFormChange={onFormChange}
          onSubmit={onSubmit}
          isSubmitting={detailFormSubmitting}
          message={detailFormError ? { ...detailFormError, type: 'error' } : undefined}
        >
          <Divider>基本信息</Divider>
          <Text required={true} id="name" fieldName="姓名" label="姓名" />

          <Select required={true} id="gender" fieldName="性别" label="性别">
            <SelectOption value="男">男</SelectOption>
            <SelectOption value="女">女</SelectOption>
            <SelectOption value="其他">其他</SelectOption>
          </Select>

          <DatePicker id="birthday" label="生日" required={true} fieldName="生日" />

          <Text
            required={true}
            id="email"
            fieldName="邮箱"
            label="邮箱"
            iconType="mail"
            pattern={patterns.email}
            // validator={emailValidator}
          />

          <Divider>报销和赠礼</Divider>

          <Text required={true} id="city" fieldName="所在城市" label="所在城市" iconType="home" />

          <Text
            required={true}
            id="alipay"
            fieldName="报销收款支付宝"
            label="支付宝"
            iconType="alipay"
          />

          <Select required={true} id="tShirtSize" fieldName="T-shirt尺寸" label="T-shirt尺寸">
            <SelectOption value="XS">XS</SelectOption>
            <SelectOption value="S">S</SelectOption>
            <SelectOption value="M">M</SelectOption>
            <SelectOption value="L">L</SelectOption>
            <SelectOption value="XL">XL</SelectOption>
            <SelectOption value="XXL">XXL</SelectOption>
            <SelectOption value="XXXL">XXXL</SelectOption>
          </Select>

          <Divider>教育信息</Divider>

          <Text required={true} id="school" fieldName="学校" label="学校" iconType="book" />

          <Text required={true} id="major" fieldName="专业" label="专业" iconType="book" />

          <Select required={true} id="grade" fieldName="年级" label="年级">
            <SelectOption value="大一">大一</SelectOption>
            <SelectOption value="大二">大二</SelectOption>
            <SelectOption value="大三">大三</SelectOption>
            <SelectOption value="大四">大四</SelectOption>
            <SelectOption value="研一">研一</SelectOption>
            <SelectOption value="研二">研二</SelectOption>
            <SelectOption value="研三">研三</SelectOption>
            <SelectOption value="博士">博士</SelectOption>
          </Select>

          <DatePicker id="graduateTime" label="毕业时间" required={true} fieldName="毕业时间" />

          <Divider>紧急联系人</Divider>

          <Text
            required={true}
            id="urgentConcatName"
            fieldName="紧急联系人姓名"
            label="紧急联系人姓名"
            iconType="user"
          />

          <Text
            pattern={patterns.phone}
            required={true}
            id="urgentConcatPhone"
            fieldName="紧急联系人电话"
            label="紧急联系人电话"
            iconType="phone"
          />

          <Text
            required={true}
            id="urgentConcatRelationship"
            fieldName="与紧急联系人关系"
            label="与紧急联系人关系"
            iconType="team"
          />

          <Divider>社交相关</Divider>

          <Text required={false} id="github" fieldName="Github" label="Github" iconType="github" />

          <Text
            required={false}
            id="linkedIn"
            fieldName="LinkedIn"
            label="LinkedIn"
            iconType="linkedin"
          />

          <Text
            required={false}
            id="codingDotNet"
            fieldName="coding.net"
            label="coding.net"
            iconType="trophy"
          />

          <Text required={false} id="blog" fieldName="个人博客" label="个人博客" />

          <Divider>比赛相关</Divider>

          <TextArea
            required={false}
            id="specialNeeds"
            fieldName="比赛中的特殊需要，如饮食、出行方面"
            label="特殊需要"
            rows={4}
          />

          <Select required={true} id="role" fieldName="角色" label="角色" mode="tags">
            <SelectOption value="前端">前端</SelectOption>
            <SelectOption value="产品">产品</SelectOption>
            <SelectOption value="设计">设计</SelectOption>
            <SelectOption value="后端">后端</SelectOption>
            <SelectOption value="机器学习">机器学习</SelectOption>
            <SelectOption value="硬件开发">硬件开发</SelectOption>
            <SelectOption value="其他">其他</SelectOption>
          </Select>

          <Select required={true} id="skills" fieldName="技能" label="技能" mode="tags">
            <SelectOption value="JavaScript"> JavaScript </SelectOption>
            <SelectOption value="CSS/HTML"> CSS/HTML </SelectOption>
            <SelectOption value="Rust"> Rust </SelectOption>
            <SelectOption value="PHP"> PHP </SelectOption>
            <SelectOption value="Swift"> Swift </SelectOption>
            <SelectOption value="Object-C"> Object-C </SelectOption>
            <SelectOption value="Kotlin"> Kotlin </SelectOption>
            <SelectOption value="Erlang"> Erlang </SelectOption>
            <SelectOption value="Python"> Python </SelectOption>
            <SelectOption value="Golang"> Golang </SelectOption>
            <SelectOption value="C/C++"> C/C++ </SelectOption>
            <SelectOption value="C#"> C# </SelectOption>
            <SelectOption value="Java"> Java </SelectOption>
            <SelectOption value="Ruby"> Ruby </SelectOption>
            <SelectOption value="Sketch"> Sketch </SelectOption>
            <SelectOption value="PhotoShop"> PhotoShop </SelectOption>
            <SelectOption value="Axure"> Axure </SelectOption>
          </Select>

          <TextArea
            required={false}
            id="hackdayTimes"
            fieldName="参加过的hackday"
            label="参加过的hackday"
            rows={4}
          />

          <Divider>附件</Divider>

          <File id="resume" required={true} fieldName="你的简历" label="你的简历" />

          <File id="collection" required={false} fieldName="你的作品集" label="你的作品集" />

          <RadioGroup
            id="resumeToSponsor"
            label="简历提供给赞助商"
            required={true}
            message="请选择合适的选项"
          >
            <Radio value={true}>同意</Radio>
            <Radio value={false}>不同意</Radio>
          </RadioGroup>

          <RadioGroup
            id="resumeForWork"
            label="简历供赞助商实习筛选"
            required={true}
            message="请选择合适的选项"
          >
            <Radio value={true}>同意</Radio>
            <Radio value={false}>不同意</Radio>
          </RadioGroup>

          <Submit title="提交" />
        </MyForm>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      detailData: state.detailForm.data,
      detailFormSubmitting: state.detailForm.isSubmitting,
      detailFormError: state.detailForm.error,
    };
  },
  dispatch => ({
    onFormChange(value: any) {
      dispatch({
        type: 'DETAIL_FORM_CHANGE',
        payload: value,
      });
    },
    onEnter() {
      dispatch({
        type: TYPE.GET_USER_DETAIL._,
      });
    },
    onSubmit() {
      dispatch({ type: TYPE.DETAIL_FORM_SUBMIT._ });
    },
  }),
)(DetailView);
