import { ofType } from 'redux-observable';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TYPE from '../redux/actions';
import { Epic } from './typings';
import { replace } from 'connected-react-router';
import { AnyAction } from 'redux';
import { getUserInfo } from './storeState';

const type = TYPE.APPLY_PROCESS_SET_MAX_STEP;

const applyProcessInitToD: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_PROCESS_START),
        mergeMap(() => of({ type, payload: 0 })),
    );

const applyProcessDToT: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_PROCESS_IS_D),
        mergeMap(() => of({ type, payload: 1 })),
    );

const applyProcessTToC: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_PROCESS_IS_T),
        mergeMap(() => of({ type, payload: 2 })),
    );

const applyProcessCToEnd: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_PROCESS_IS_C),
        mergeMap(() => of({ type, payload: 3 })),
    );

const loadTeamInfo: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.NEW_TEAM_FORM_SUBMIT.OK, TYPE.JOIN_TEAM_FORM_SUBMIT.OK),
        mergeMap(({ payload }: AnyAction) =>
            of(
                { type: TYPE.SET_USER_INFO, payload: { teamId: payload } },
                { type: TYPE.LOAD_TEAM_INFO._, payload: { teamId: payload } },
            ),
        ),
    );

const detailFormSubmitOKInfo: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DETAIL_FORM_SUBMIT.OK),
        mergeMap(() => of({ type: TYPE.APPLY_PROCESS_IS_D })),
    );

const newOrJoinFormSubmitOK: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.NEW_TEAM_FORM_SUBMIT.OK, TYPE.JOIN_TEAM_FORM_SUBMIT.OK),
        // takeUntil(action$.pipe(ofType(TYPE.CHANGE_IS_T_SUBMIT.OK))),
        mergeMap(() => of({ type: TYPE.CHANGE_IS_T_SUBMIT._ })),
    );

const applyConfirmSubmitOK: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_CONFIRM_SUBMIT.OK),
        mergeMap(() =>
            of(
                { type: TYPE.SET_USER_INFO, payload: { isApplyConfirmed: true } },
                { type: TYPE.APPLY_PROCESS_IS_C },
            ),
        ),
    );

const applyProcessStart: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_PROCESS_START),
        mergeMap(() => {
            const put: Array<{ type: string }> = [];
            const { isDetailFormSubmitted, isTeamFormSubmitted, isApplyConfirmed } = getUserInfo();
            if (isDetailFormSubmitted) {
                put.push({ type: TYPE.APPLY_PROCESS_IS_D });
            }
            if (isTeamFormSubmitted) {
                put.push({ type: TYPE.APPLY_PROCESS_IS_T });
            }
            if (isApplyConfirmed) {
                put.push({ type: TYPE.APPLY_PROCESS_IS_C });
            }

            return of(...put);
        }),
    );

const applyProcessEnd: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.APPLY_PROCESS_END),
        mergeMap(() => of(replace('/'))),
    );

const setUserInfo: Epic = action$ =>
    action$.pipe(
        ofType(
            TYPE.NEW_TEAM_FORM_SUBMIT.OK,
            TYPE.JOIN_TEAM_FORM_SUBMIT.OK,
            TYPE.CHANGE_IS_T_SUBMIT.OK,
        ),
        mergeMap(() =>
            of(
                { type: TYPE.SET_USER_INFO, payload: { isTeamFormSubmitted: true } },
                { type: TYPE.APPLY_PROCESS_IS_T },
            ),
        ),
    );

export default [
    applyProcessInitToD,
    applyProcessDToT,
    applyProcessTToC,
    applyProcessCToEnd,
    loadTeamInfo,
    detailFormSubmitOKInfo,
    newOrJoinFormSubmitOK,
    applyConfirmSubmitOK,
    applyConfirmSubmitOK,
    applyProcessStart,
    applyProcessEnd,
    setUserInfo,
];
