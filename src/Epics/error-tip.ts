import { Epic } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import Message from 'antd/es/message';
import { mergeMap } from 'rxjs/operators';
import { AnyAction } from 'redux';
import { of } from 'rxjs';

const errorTip: Epic = action$ =>
    action$.pipe(
        ofType(
            TYPE.DELETE_TEAM.FAIL,
            TYPE.DELETE_TEAM_MEMBER.FAIL,
            TYPE.EXIT_TEAM.FAIL,
            TYPE.CHANGE_TEAM_LEADER.FAIL,
            TYPE.JOIN_TEAM_FORM_SUBMIT.FAIL,
        ),
        mergeMap((res: AnyAction) => {
            const { payload: msg } = res;
            Message.error(msg);
            return of({
                type: TYPE.ERROR_SHOW,
            });
        }),
    );
export default [errorTip];
