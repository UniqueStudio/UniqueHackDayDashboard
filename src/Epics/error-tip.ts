import { Epic } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import Message from 'antd/es/message';
import { tap } from 'rxjs/operators';

const errorTip: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.SET_LOGGED_IN),
        action =>
            action.pipe(
                ofType(
                    TYPE.DELETE_TEAM.FAIL,
                    TYPE.DELETE_TEAM_MEMBER.FAIL,
                    TYPE.EXIT_TEAM.FAIL,
                    TYPE.CHANGE_TEAM_LEADER.FAIL,
                ),
                tap(res => {
                    const { payload: msg } = res;
                    Message.error(msg);
                }),
            ),
    );
export default [errorTip];
