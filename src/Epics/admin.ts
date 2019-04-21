import { Epic, UserStateChange } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import { mergeMap, switchMap, startWith, concatMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { getUserStateList } from './storeState';
import Message from 'antd/es/message';
import * as req from '../lib/requests';

const userStateChnage: Epic<UserStateChange> = action$ =>
    action$.pipe(
        ofType(TYPE.ADMIN_USER_STATUS_CHANGE._),
        mergeMap(action => {
            const { username, state, inWaitList, radioVal } = action;
            const userStatusList = getUserStateList();
            let flag = 1;

            const newList = userStatusList.map(
                (user: { username: string; state?: number; inWaitList?: boolean }) => {
                    if (user.username === username) {
                        user.state = +state;
                        flag = 0;
                        if (inWaitList !== undefined) {
                            user.inWaitList = !!inWaitList;
                        }
                    }
                    return user;
                },
            );
            if (flag) {
                if (inWaitList !== undefined) {
                    newList.push({ username, state: +state, inWaitList: !!inWaitList });
                } else {
                    newList.push({ username, state: +state });
                }
            }
            return of({
                type: TYPE.ADMIN_USER_STATUS_CHANGE.OK,
                payload: newList,
                radioVal,
                username,
            });
        }),
    );

const stateChangeSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.ADMIN_USER_SUBMIT._),
        switchMap(() =>
            from(req.adminUserStateChange(getUserStateList())).pipe(
                concatMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        Message.success('操作成功');
                        return of(
                            { type: TYPE.ADMIN_USER_SUBMIT.OK },
                            { type: TYPE.ADMIN_TEAMS_INFO._ },
                            { type: TYPE.ADMIN_USER_STATUS_CHANGE.FAIL },
                        );
                    } else {
                        Message.error(message);
                        return of({ type: TYPE.ADMIN_USER_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.ADMIN_USER_SUBMIT.START }),
            ),
        ),
    );

export default [userStateChnage, stateChangeSubmit];
