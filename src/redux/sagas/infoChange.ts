// edit the user's info
import { take } from 'redux-saga/effects';
import Message from 'antd/es/message';
import * as TYPE from '../actions';

function* infoChange() {
  while (true) {
    yield take(TYPE.DETAIL_FORM_SUBMIT.OK);
    Message.success('编辑成功');
  }
}

export default infoChange;
