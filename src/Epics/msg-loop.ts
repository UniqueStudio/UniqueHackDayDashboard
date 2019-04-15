import { Epic } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { of, from } from 'rxjs';
import throttle from 'lodash-es/throttle';
import { msgPoll } from '../lib/requests';

const throttledMsgPoll = throttle(msgPoll, 9 * 1000);

const loop: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.SET_LOGGED_IN),
        takeUntil(action$.ofType(TYPE.SET_NOT_LOGGED_IN)),
        mergeMap(() =>
            from(throttledMsgPoll()).pipe(
                mergeMap(response => {
                    const [messages] = response as API.Message.SingleMessage[][];
                    const returnArr: any[] = [];
                    if (messages && messages.length > 0) {
                        returnArr.push({ type: TYPE.GET_UNREAD_MSG_ALL.OK, payload: messages });
                        if (messages[0] && messages[0].type === 'Accepted') {
                            returnArr.push({ type: TYPE.MSG_USER_ACCEPTED });
                        }
                        if (messages[0] && messages[0].type === 'Rejected') {
                            returnArr.push({ type: TYPE.MSG_USER_REJECTED });
                        }
                        if (messages[0] && messages[0].type === 'OtherMessage') {
                            window.location.reload();
                        }
                    }
                    return of(...returnArr);
                }),
            ),
        ),
    );

const messageLoop: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.START_MSG_LOOP),
        takeUntil(action$.ofType(TYPE.START_MSG_LOOP)),
        mergeMap(() => loop),
    );

export default messageLoop;
