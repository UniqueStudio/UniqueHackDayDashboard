import { combineEpics } from 'redux-observable';
import adminEpics from './admin';
import ApplyFlowEpics from './apply-flow';
import AuthRouteEpics from './auth-route';
import EntryFlowEpics from './entry-flow';
import InfoChangeEpics from './infoChange';
import MessageLoopEpics from './msg-loop';
import RequestsEpics from './requests';

export default combineEpics(
    ...adminEpics,
    ...ApplyFlowEpics,
    ...AuthRouteEpics,
    ...EntryFlowEpics,
    ...InfoChangeEpics,
    ...MessageLoopEpics,
    ...RequestsEpics,
);
