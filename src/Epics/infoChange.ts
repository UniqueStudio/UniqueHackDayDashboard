import { Epic } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import Message from 'antd/es/message';
import { mergeMap, delay } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { of } from 'rxjs';

const infoChange: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DETAIL_FORM_SUBMIT.OK),
        mergeMap(() => {
            Message.success('编辑成功');
            delay(100);
            return of(push('/'));
        }),
    );

const resetSuccess: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.RESET_PWD_FORM_SUBMIT.OK),
        mergeMap(() => {
            Message.success('重置密码成功');
            delay(100);
            return of(push('/'));
        }),
    );

export default [infoChange, resetSuccess];
