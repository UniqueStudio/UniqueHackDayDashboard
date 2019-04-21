import { Epic } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import Message from 'antd/es/message';
import { tap } from 'rxjs/operators';
import { AnyAction } from 'redux';

const errorTip: Epic = action$ =>
    action$.pipe(
        ofType(
            TYPE.DELETE_TEAM.FAIL,
            TYPE.DELETE_TEAM_MEMBER.FAIL,
            TYPE.EXIT_TEAM.FAIL,
            TYPE.CHANGE_TEAM_LEADER.FAIL,
        ),
        tap((res: AnyAction) => {
            const { payload: msg } = res;
            Message.error(msg);
        }),
    );
export default [errorTip];
