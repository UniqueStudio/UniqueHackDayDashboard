import { AnyAction } from 'redux';

export interface DetailData {
  [k: string]: any;
}

export default function detail(
  state: DetailData = {
    name: {},
    gender: {},
    birthday: {},
    email: {},
    resume: {},
    tShirtSize: {},
    city: {},
    alipay: {},
    school: {},
    major: {},
    grade: {},
    graduateTime: {}, // 年月日
    urgentConcatName: {},
    urgentConcatPhone: {},
    urgentConcatRelationship: {},

    collections: {},
    specialNeeds: {},
    github: {},
    linkedIn: {},
    codeingDotNet: {},
    blog: {},

    role: {}, // 产品，设计，前端，后端，机器学习，硬件开发，其他
    skills: {},
    hackdayTimes: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'DETAIL_FORM_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
