import { AnyAction } from 'redux';

export interface DetailData {
  [k: string]: any;
}

const initialState = {
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

  collection: {},
  specialNeeds: {},
  github: {},
  linkedIn: {},
  codeingDotNet: {},
  blog: {},

  role: {}, // 产品，设计，前端，后端，机器学习，硬件开发，其他
  skills: {},
  hackdayTimes: {},
};

const cachedDetail = JSON.parse(localStorage.getItem('detailForm') || 'null') as any;

export default function detail(
  state: DetailData = cachedDetail || initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case 'DETAIL_FORM_CHANGE':
      const ret = {
        ...state,
        ...action.payload,
      };

      const retBackedup = JSON.parse(JSON.stringify(ret));
      delete retBackedup.resume;
      delete retBackedup.collection;
      localStorage.setItem('detailForm', JSON.stringify(retBackedup));
      return ret;
    default:
      return state;
  }
}
