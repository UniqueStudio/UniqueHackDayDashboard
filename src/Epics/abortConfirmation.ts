import { ofType } from 'redux-observable';
import { abortConfirm } from '../lib/requests';
import Message from 'antd/es/message';
import { switchMap, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as TYPE from '../redux/actions';
import { Epic } from './typings';

export const abortConfirmation: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.ABORT_CONFIRM_SUBMIT._),
        switchMap(() =>
            from(abortConfirm()).pipe(
                mergeMap(res => {
                    const [status, msg] = res;
                    if (status === true) {
                        window.location.reload();
                    } else {
                        Message.error(msg);
                    }
                    return of({ type: TYPE.ABORT_CONFIRM_SUBMIT.OK });
                }),
            ),
        ),
    );
