import { takeLatest, call } from 'redux-saga/effects';
import { abortConfirm } from '../../lib/requests';
import Message from 'antd/es/message';
import * as TYPE from '../actions';

function* abortConfirmation() {
  yield takeLatest(TYPE.ABORT_CONFIRM_SUBMIT._, function*() {
    const [status, msg] = yield call(abortConfirm);
    if (status === true) {
      window.location.reload();
    } else {
      Message.error(msg);
    }
  });
}

export default abortConfirmation;
