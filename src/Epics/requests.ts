import * as TYPE from '../redux/actions';
import * as req from '../lib/requests';
import { Epic } from './typings';
import { ofType } from 'redux-observable';
import { mergeMap, startWith, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import {
    getUserInfo,
    getLoginForm,
    getRegisterForm,
    getResetPwdForm,
    getDetailedForm,
    getNewTeamForm,
    getJoinTeamForm,
} from './storeState';
import { AnyAction } from 'redux';

export const loadUserInfo: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_USER_INFO._),
        switchMap(() =>
            from(req.getUserInfo()).pipe(
                mergeMap(res => {
                    const [userInfo] = res;
                    if (userInfo) {
                        return of({ type: TYPE.LOAD_USER_INFO.OK, payload: userInfo });
                    } else {
                        return of({ type: TYPE.LOAD_USER_INFO.FAIL });
                    }
                }),
            ),
        ),
        startWith({ type: TYPE.LOAD_USER_INFO.START }),
    );

export const loadTeamInfo: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_TEAM_INFO._),
        switchMap(() => {
            const { teamId } = getUserInfo();
            return from(req.getTeamInfo(teamId!)).pipe(
                mergeMap(res => {
                    const [teamInfo] = res;
                    if (teamInfo) {
                        return of({ type: TYPE.LOAD_TEAM_INFO.OK, payload: teamInfo });
                    } else {
                        return of({ type: TYPE.LOAD_TEAM_INFO.FAIL });
                    }
                }),
            );
        }),
    );

export const getAdminTeamsInfo: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.ADMIN_TEAMS_INFO._),
        switchMap(() =>
            from(req.adminLoadUsersInfo()).pipe(
                mergeMap(res => {
                    const [data] = res;
                    if (data) {
                        return of({ type: TYPE.ADMIN_TEAMS_INFO.OK, payload: data });
                    } else {
                        return of({ type: TYPE.ADMIN_TEAMS_INFO.FAIL });
                    }
                }),
            ),
        ),
        startWith({ type: TYPE.ADMIN_TEAMS_INFO.START }),
    );

export const loginFormSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOGIN_FORM_SUBMIT._),
        switchMap((action: AnyAction) => {
            const { data } = getLoginForm();
            return from(req.login(data.username.value!, data.password.value!, action.payload)).pipe(
                mergeMap(res => {
                    const [token, message] = res;
                    if (token) {
                        if (data.autoLogin.value) {
                            localStorage.setItem('token', token);
                        }
                        return of({ type: TYPE.LOGIN_FORM_SUBMIT.OK, payload: token });
                    } else {
                        return of({ type: TYPE.LOGIN_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.LOGIN_FORM_SUBMIT.START }),
    );

export const regFormSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.REGISTER_FORM_SUBMIT._),
        switchMap((action: AnyAction) => {
            const { data } = getRegisterForm();
            return from(
                req.register(
                    data.username.value!,
                    data.password.value!,
                    data.phone.value!,
                    data.code.value!,
                    action.payload,
                ),
            ).pipe(
                mergeMap(res => {
                    const [token, message] = res;
                    if (token) {
                        return of({ type: TYPE.REGISTER_FORM_SUBMIT.OK, payload: token });
                    } else {
                        return of({ type: TYPE.REGISTER_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.REGISTER_FORM_SUBMIT.START }),
    );

export const resetPwdSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.RESET_PWD_FORM_SUBMIT._),
        switchMap((action: AnyAction) => {
            const { data } = getResetPwdForm();
            return from(
                req.resetPwdRequest(
                    data.phone.value!,
                    data.code.value!,
                    data.password.value!,
                    action.payload,
                ),
            ).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.START }),
    );

export const sendSMSSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.REGISITER_SEND_SMS_SUBMIT._),
        switchMap((action: AnyAction) => {
            const { data } = getRegisterForm();
            return from(req.registerSendSMS(data.phone.value!, action.payload)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.START }),
    );

export const detailFormSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DETAIL_FORM_SUBMIT._),
        switchMap(() => {
            const { data } = getDetailedForm();
            return from(
                req.submitDetail(Object.keys(data).reduce(
                    (p, key) => ({
                        ...p,
                        [key]: (data as any)[key].value,
                    }),
                    {},
                ) as any),
            ).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.DETAIL_FORM_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.DETAIL_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.DETAIL_FORM_SUBMIT.START }),
    );

export const newTeamFormSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.NEW_TEAM_FORM_SUBMIT._),
        switchMap(() => {
            const { data } = getNewTeamForm();
            return from(req.createTeam(data.teamName.value!)).pipe(
                mergeMap(res => {
                    const [teamId, message] = res;
                    if (teamId !== null) {
                        return of({ type: TYPE.NEW_TEAM_FORM_SUBMIT.OK, payload: teamId });
                    } else {
                        return of({ type: TYPE.NEW_TEAM_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.NEW_TEAM_FORM_SUBMIT.START }),
    );

export const joinTeamSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.JOIN_TEAM_FORM_SUBMIT._),
        switchMap(() => {
            const [{ data }, username] = [getJoinTeamForm(), getUserInfo().username];
            return from(
                req.joinTeam(data.teamLeaderName.value!, data.teamLeaderPhone.value!, username!),
            ).pipe(
                mergeMap(res => {
                    const [teamId, message] = res;
                    if (teamId !== null) {
                        return of({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.OK, payload: teamId });
                    } else {
                        return of({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
            );
        }),
        startWith({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.START }),
    );
