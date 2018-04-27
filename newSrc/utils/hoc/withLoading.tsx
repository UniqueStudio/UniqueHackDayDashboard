import * as React from 'react';
import { sagaMiddleware } from '../redux/store';
import { all, take } from 'redux-saga/effects';
import { Task } from 'redux-saga';

type State<P> = { [T in keyof P]: boolean };
type Options<P> = { [T in keyof P]: { start: string; end: string } };

export default function withLoading<T, P extends Options<P>>(options: P) {
  return function HOC(
    WrappedComponent: React.ComponentType<T & State<P>>,
  ): React.ComponentClass<T> {
    return class WithLoading extends React.Component<T, State<P>> {
      static displayName = `WithLoading(${WrappedComponent.displayName})`;

      state = Object.keys(options).reduce(
        (p, k) => ({
          ...p,
          [k]: false,
        }),
        {},
      ) as State<P>;

      render() {
        return <WrappedComponent {...this.state} />;
      }

      *loadingStatusSaga() {
        const self = this;
        yield all(
          Object.keys(options).map(
            k =>
              function*() {
                while (true) {
                  yield take(options[k as keyof P].start);
                  self.setState({ [k]: true });
                  yield take(options[k as keyof P].end);
                  self.setState({ [k]: false });
                }
              },
          ),
        );
      }

      loadingStatusTask: Task | null = null;

      componentDidMount() {
        this.loadingStatusTask = sagaMiddleware.run(this.loadingStatusSaga);
      }

      componentWillUnmount() {
        if (this.loadingStatusTask) {
          this.loadingStatusTask.cancel();
        }
      }
    };
  };
}
