import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TYPE from '../redux/actions';
import { Epic, LoadUserInfoOK } from './typings';
import { getMsgData, getTeamId } from './storeState';
import { replace } from 'connected-react-router';
import { PartialUserInfo } from '../redux/reducers/user';

const loadUserInfoOK: Epic<LoadUserInfoOK> = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_USER_INFO.OK),
        mergeMap(({ payload: loadUserInfoPayload }) => {
            const put: any[] = [
                { type: TYPE.SET_USER_INFO, payload: loadUserInfoPayload },
                { type: TYPE.SET_LOGGED_IN },
                { type: TYPE.SHOW_APP_VIEW },
                { type: TYPE.START_MSG_LOOP },
            ];

            const userInfoPayload: PartialUserInfo = loadUserInfoPayload;

            if ('number' === typeof userInfoPayload.teamId) {
                put.push({
                    type: TYPE.LOAD_TEAM_INFO._,
                    payload: { teamId: userInfoPayload.teamId },
                });
            }
            if (true === userInfoPayload.isDetailFormSubmitted) {
                put.push({ type: TYPE.GET_USER_DETAIL._ });
            }
            if (userInfoPayload.permission !== 0) {
                put.push({ type: TYPE.ADMIN_TEAMS_INFO._ });
            }
            put.push({ type: TYPE.GET_UNREAD_MSG_ALL._ });

            return of(...put);
        }),
    );

const loadUserGetMsgAll: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.GET_UNREAD_MSG_ALL.OK, TYPE.GET_UNREAD_MSG_ALL.FAIL),
        mergeMap(() => of({ type: TYPE.GET_MSG_ALL._ })),
    );

const loadUserInfoFailer: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_USER_INFO.FAIL),
        mergeMap(() => of({ type: TYPE.SHOW_APP_VIEW })),
    );

const loadUserInfoAfterReg: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.REGISTER_FORM_SUBMIT.OK),
        mergeMap(() => of({ type: TYPE.LOAD_USER_INFO._ })),
    );

const loadUserAfterLogin: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOGIN_FORM_SUBMIT.OK, TYPE.REGISTER_FORM_SUBMIT.OK),
        mergeMap(() =>
            of(
                { type: TYPE.SET_LOGGED_IN },
                { type: TYPE.LOAD_USER_INFO._ },
                { type: TYPE.SHOW_APP_VIEW },
                { type: TYPE.START_MSG_LOOP },
            ),
        ),
    );

const setMessageReadAll: Epic = action$ =>
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

const setMessageDeleteAll: Epic = action$ =>
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

const formSubmitOK: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.JOIN_TEAM_FORM_SUBMIT.OK, TYPE.NEW_TEAM_FORM_SUBMIT.OK),
        mergeMap(() => of({ type: TYPE.LOAD_TEAM_INFO._, payload: { teamId: getTeamId() } })),
    );

const userLogout: Epic = action$ =>
    action$.pipe(
        ofType('LOGOUT_CLICKED'),
        mergeMap(() => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setTimeout(() => window.location.reload(), 0);
            return of({ type: TYPE.SET_NOT_LOGGED_IN }, replace('/user_entry'));
        }),
    );

export default [
    loadUserInfoOK,
    loadUserGetMsgAll,
    loadUserInfoFailer,
    loadUserInfoAfterReg,
    loadUserAfterLogin,
    setMessageReadAll,
    setMessageDeleteAll,
    formSubmitOK,
    userLogout,
];
