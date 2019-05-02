import { Epic } from './typings';
import { ofType } from 'redux-observable';
import * as TYPE from '../redux/actions';
import { of } from 'rxjs';
import { replace } from 'connected-react-router';
import { mergeMap } from 'rxjs/operators';

const authRouteLogIn: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.SET_LOGGED_IN),
        mergeMap(() => of(replace('/'))),
    );

const authRouteLogOut: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.SET_NOT_LOGGED_IN),
        mergeMap(() => of(replace('/user_entry'))),
    );

const authRouteDetailEdit: Epic = action$ =>
    action$.pipe(
        ofType(TYPE.DETAIL_EDIT),
        mergeMap(() => of(replace('/detail_edit'))),
    );

export default [authRouteLogIn, authRouteLogOut, authRouteDetailEdit];
