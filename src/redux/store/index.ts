import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { History, createBrowserHistory } from 'history';
import reducer, { RootState } from '../reducers';
import RootEpics from '../../Epics/index';

export const history: History = createBrowserHistory();
const composeEnhancers =
    ((process.env.NODE_ENV === 'development' ||
        window.location.host.includes('console.fredliang.cn')) &&
        (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) ||
    compose;

const epicMiddleware = createEpicMiddleware();

const store: Store<RootState> = createStore(
    reducer(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware)),
);

epicMiddleware.run(RootEpics);

export default store;
