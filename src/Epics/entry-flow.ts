import { ofType } from 'redux-observable';
import { mergeMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TYPE from '../redux/actions';
import { Epic, LoadUserInfoOK } from './typings';
import { getUserTeamId, getIsDetailedSubmitted, getPermission, getMsgData } from './storeState';
import { replace } from 'connected-react-router';

export const loadUserInfoOK: Epic<LoadUserInfoOK> = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_USER_INFO.OK),
        exhaustMap(({ payload: loadUserInfoPayload }) => {
            const put: any[] = [{ type: TYPE.SET_USER_INFO, payload: loadUserInfoPayload }];

            if ('number' === typeof getUserTeamId()) {
                put.push({ type: TYPE.LOAD_TEAM_INFO._ });
            }
            if (true === getIsDetailedSubmitted()) {
                put.push({ type: TYPE.GET_USER_DETAIL._ });
            }
            if (true === getPermission()) {
                put.push({ type: TYPE.ADMIN_TEAMS_INFO._ });
            }
            put.push({ type: TYPE.GET_UNREAD_MSG_ALL._ });

            return of(...put);
        }),
    );

export const loadUserGetMsgAll: Epic = action$ =>
    action$.pipe(
        ofType([TYPE.GET_UNREAD_MSG_ALL.OK, TYPE.GET_UNREAD_MSG_ALL.FAIL]),
        exhaustMap(() => of({ type: TYPE.GET_MSG_ALL._ })),
    );

export const loadUserInfoFailer: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_USER_INFO.FAIL),
        exhaustMap(() => of({ type: TYPE.SHOW_APP_VIEW })),
    );

export const loadUserInfoAfterReg: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.REGISTER_FORM_SUBMIT.OK),
        exhaustMap(() => of({ type: TYPE.LOAD_USER_INFO._ })),
    );

export const loadUserAfterLogin: Epic = action$ =>
    action$.pipe(
        ofType([TYPE.LOGIN_FORM_SUBMIT.OK, TYPE.REGISTER_FORM_SUBMIT.OK]),
        mergeMap(() =>
            of(
                { type: 'SET_LOGGED_IN' },
                { type: TYPE.SHOW_APP_VIEW },
                { type: TYPE.START_MSG_LOOP },
            ),
        ),
    );

export const setMessageReadAll: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.SET_MSG_READ_ALL),
        mergeMap(() => {
            const { unreadMessages } = getMsgData();
            return of(
                ...unreadMessages.map((msg: API.Message.SingleMessage) => ({
                    type: TYPE.SET_MSG_READ._,
                    payload: msg.id,
                })),
            );
        }),
    );

export const setMessageDeleteAll: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DELETE_MSG_ALL),
        mergeMap(() => {
            const { unreadMessages, readMessages } = getMsgData();
            return of(
                ...[...unreadMessages, ...readMessages].map((msg: API.Message.SingleMessage) => ({
                    type: TYPE.DELETE_MSG._,
                    payload: msg.id,
                })),
            );
        }),
    );

export const formSubmitOK: Epic = action$ =>
    action$.pipe(
        ofType([TYPE.JOIN_TEAM_FORM_SUBMIT.OK, TYPE.NEW_TEAM_FORM_SUBMIT.OK]),
        mergeMap(() => of({ type: TYPE.LOAD_TEAM_INFO._ })),
    );

export const userLogout: Epic = action$ =>
    action$.pipe(
        ofType('LOGOUT_CLICKED'),
        mergeMap(() => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setTimeout(() => window.location.reload(), 0);
            return of({ type: TYPE.SET_NOT_LOGGED_IN }, replace('/user_entry'));
        }),
    );
