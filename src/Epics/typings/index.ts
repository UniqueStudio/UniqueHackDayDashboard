import { Action, AnyAction } from 'redux';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import * as TYPE from '../../redux/actions';
import { RootState } from '../../redux/reducers';

const dependencies = { sessionStorage };
export type Dependencies = typeof dependencies;

export type Epic<T extends Action = Action> = (
    action$: ActionsObservable<T>,
    state$: StateObservable<RootState>,
    dependencies: Dependencies,
) => Observable<AnyAction>;

export interface UserStateChange {
    type: TYPE.ADMIN_USER_STATUS_CHANGE;
    username: string;
    state: string;
    inWaitList: string;
    radioVal: string;
}

export interface LoadUserInfoOK {
    type: TYPE.LOAD_USER_INFO_OK | TYPE.LOAD_USER_INFO_FAIL;
    payload: any;
}

export interface DeleteFile {
    type: TYPE.DELETE_FILE;
    payload: {
        id: string;
        type: string;
    };
}
