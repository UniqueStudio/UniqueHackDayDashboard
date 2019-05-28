import * as TYPE from '../redux/actions';
import * as req from '../lib/requests';
import { Epic, DeleteFile } from './typings';
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
    getTeamId,
} from './storeState';
import { AnyAction } from 'redux';

const loadUserInfo: Epic = action$ =>
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
                startWith({ type: TYPE.LOAD_USER_INFO.START }),
            ),
        ),
    );

const loadTeamInfo: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.LOAD_TEAM_INFO._),
        switchMap(({ payload: { teamId } }: AnyAction) => {
            return from(req.getTeamInfo(teamId!)).pipe(
                mergeMap(res => {
                    const [teamInfo] = res;
                    if (teamInfo) {
                        return of({ type: TYPE.LOAD_TEAM_INFO.OK, payload: teamInfo });
                    } else {
                        return of({ type: TYPE.LOAD_TEAM_INFO.FAIL });
                    }
                }),
                startWith({ type: TYPE.LOAD_TEAM_INFO.START }),
            );
        }),
    );

const getAdminTeamsInfo: Epic = action$ =>
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
                startWith({ type: TYPE.ADMIN_TEAMS_INFO.START }),
            ),
        ),
    );

const loginFormSubmit: Epic = action$ =>
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
                startWith({ type: TYPE.LOGIN_FORM_SUBMIT.START }),
            );
        }),
    );

const regFormSubmit: Epic = action$ =>
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
                startWith({ type: TYPE.REGISTER_FORM_SUBMIT.START }),
            );
        }),
    );

const resetPwdSubmit: Epic = action$ =>
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
                        return of({ type: TYPE.RESET_PWD_FORM_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.RESET_PWD_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.RESET_PWD_FORM_SUBMIT.START }),
            );
        }),
    );

const resetPwdSmsSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.RESET_PWD_SEND_SMS_SUBMIT._),
        mergeMap((action: AnyAction) => {
            const { data } = getResetPwdForm();
            return from(req.resetPwdSendSMS(data.phone.value!, action.payload)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.RESET_PWD_SEND_SMS_SUBMIT.START }),
            );
        }),
    );

const regSendSMSSubmit: Epic = action$ =>
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
                startWith({ type: TYPE.REGISITER_SEND_SMS_SUBMIT.START }),
            );
        }),
    );

const detailFormSubmit: Epic = action$ =>
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
                startWith({ type: TYPE.DETAIL_FORM_SUBMIT.START }),
            );
        }),
    );

const newTeamFormSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.NEW_TEAM_FORM_SUBMIT._),
        switchMap(() => {
            const { data } = getNewTeamForm();
            return from(req.createTeam(data.teamName.value!)).pipe(
                mergeMap(res => {
                    const [teamId, message] = res;
                    if (teamId !== null && teamId !== 0) {
                        return of({ type: TYPE.NEW_TEAM_FORM_SUBMIT.OK, payload: teamId });
                    } else {
                        return of({ type: TYPE.NEW_TEAM_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.NEW_TEAM_FORM_SUBMIT.START }),
            );
        }),
    );

const joinTeamSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.JOIN_TEAM_FORM_SUBMIT._),
        switchMap(() => {
            const [{ data }, username] = [getJoinTeamForm(), getUserInfo().username];
            return from(
                req.joinTeam(data.teamLeaderName.value!, data.teamLeaderPhone.value!, username!),
            ).pipe(
                mergeMap(res => {
                    const [teamId, message] = res;
                    if (teamId) {
                        return of({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.OK, payload: teamId });
                    } else {
                        return of({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.JOIN_TEAM_FORM_SUBMIT.START }),
            );
        }),
    );

const changeIsTSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.CHANGE_IS_T_SUBMIT._),
        switchMap(() => {
            return from(req.changeIsT(true)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.CHANGE_IS_T_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.CHANGE_IS_T_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.CHANGE_IS_T_SUBMIT.START }),
            );
        }),
    );

const applyConfirmSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_CONFIRM_SUBMIT._),
        switchMap(() => {
            return from(req.confirmApply()).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.APPLY_CONFIRM_SUBMIT.OK });
                    } else {
                        return of({ type: TYPE.APPLY_CONFIRM_SUBMIT.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.APPLY_CONFIRM_SUBMIT.START }),
            );
        }),
    );

const getUserDetailSubmit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.GET_USER_DETAIL._),
        switchMap(() =>
            from(req.getUserDetail()).pipe(
                mergeMap(res => {
                    const [data, message] = res;
                    if (data) {
                        return of({
                            type: TYPE.GET_USER_DETAIL.OK,
                            payload: Object.keys(data).reduce((p, k) => {
                                return {
                                    ...p,
                                    [k]: {
                                        value: (data as any)[k],
                                        name: k,
                                        touched: false,
                                        validating: false,
                                        dirty: false,
                                    },
                                };
                            }, {}),
                        });
                    } else {
                        return of({ type: TYPE.GET_USER_DETAIL.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.GET_USER_DETAIL.START }),
            ),
        ),
    );

const getMessageAll: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.GET_MSG_ALL._),
        switchMap(() =>
            from(req.getReadMsgAll()).pipe(
                mergeMap(res => {
                    const [msg, message] = res;
                    if (msg) {
                        return of({ type: TYPE.GET_MSG_ALL.OK, payload: msg });
                    } else {
                        return of({ type: TYPE.GET_MSG_ALL.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.GET_MSG_ALL.START }),
            ),
        ),
    );

const getUnreadMessageAll: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.GET_UNREAD_MSG_ALL._),
        switchMap(() =>
            from(req.getUnreadMsgAll()).pipe(
                mergeMap(res => {
                    const [msg, message] = res;
                    if (msg) {
                        return of({ type: TYPE.GET_UNREAD_MSG_ALL.OK, payload: msg });
                    } else {
                        return of({ type: TYPE.GET_UNREAD_MSG_ALL.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.GET_UNREAD_MSG_ALL.START }),
            ),
        ),
    );

const setMessageRead: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.SET_MSG_READ._),
        mergeMap((a: AnyAction) =>
            from(req.setMsgRead(a.payload)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.SET_MSG_READ.OK, payload: a.payload });
                    } else {
                        return of({ type: TYPE.SET_MSG_READ.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.SET_MSG_READ.START }),
            ),
        ),
    );

const deleteMessage: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DELETE_MSG._),
        mergeMap((a: AnyAction) =>
            from(req.deleteMsg(a.payload)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.DELETE_MSG.OK, payload: a.payload });
                    } else {
                        return of({ type: TYPE.DELETE_MSG.FAIL, payload: message });
                    }
                }),

                startWith({ type: TYPE.DELETE_MSG.START }),
            ),
        ),
    );

const deleteTeamMember: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DELETE_TEAM_MEMBER._),
        mergeMap((a: AnyAction) => {
            const teamId = getTeamId();
            return from(req.deleteTeamMember(a.payload, teamId!)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.DELETE_TEAM_MEMBER.OK, payload: a.payload });
                    } else {
                        return of({ type: TYPE.DELETE_TEAM_MEMBER.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.DELETE_TEAM_MEMBER.START }),
            );
        }),
    );

const exitTeam: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.EXIT_TEAM._),
        mergeMap(() => {
            const [teamId, username] = [getTeamId(), getUserInfo().username];
            return from(req.deleteTeamMember(username!, teamId!)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.EXIT_TEAM.OK, payload: username });
                    } else {
                        return of({ type: TYPE.EXIT_TEAM.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.EXIT_TEAM.START }),
            );
        }),
    );

const deleteTeam: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DELETE_TEAM._),
        mergeMap(() => {
            const teamId = getTeamId();
            return from(req.deleteTeam(teamId!)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.DELETE_TEAM.OK, payload: teamId });
                    } else {
                        return of({ type: TYPE.DELETE_TEAM.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.DELETE_TEAM.START }),
            );
        }),
    );

const deleteFile: Epic<DeleteFile> = action$ =>
    action$.pipe(
        ofType(TYPE.DELETE_FILE._),
        mergeMap(({ payload: { id, type } }) => {
            return from(req.deleteResume(id, type)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of({ type: TYPE.DELETE_FILE.OK });
                    } else {
                        return of({ type: TYPE.DELETE_FILE.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.DELETE_FILE.START }),
            );
        }),
    );

const changeTeamLeader: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.CHANGE_TEAM_LEADER._),
        mergeMap((a: AnyAction) => {
            const teamId = getTeamId();
            return from(req.changeTeamLeader(a.payload, teamId!)).pipe(
                mergeMap(res => {
                    const [ok, message] = res;
                    if (ok) {
                        return of(
                            { type: TYPE.CHANGE_TEAM_LEADER.OK, payload: a.payload },
                            { type: TYPE.LOAD_TEAM_INFO._, payload: { teamId: teamId! } },
                            { type: 'LOAD_USER_INFO' },
                        );
                    } else {
                        return of({ type: TYPE.CHANGE_TEAM_LEADER.FAIL, payload: message });
                    }
                }),
                startWith({ type: TYPE.CHANGE_TEAM_LEADER.START }),
            );
        }),
    );

export default [
    loadUserInfo,
    loadTeamInfo,
    getAdminTeamsInfo,
    loginFormSubmit,
    regFormSubmit,
    regSendSMSSubmit,
    resetPwdSmsSubmit,
    resetPwdSubmit,
    detailFormSubmit,
    newTeamFormSubmit,
    joinTeamSubmit,
    changeIsTSubmit,
    applyConfirmSubmit,
    getUserDetailSubmit,
    getMessageAll,
    getUnreadMessageAll,
    setMessageRead,
    deleteMessage,
    deleteTeamMember,
    exitTeam,
    deleteTeam,
    changeTeamLeader,
    deleteFile,
];
