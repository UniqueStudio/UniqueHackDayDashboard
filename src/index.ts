import 'regenerator-runtime/runtime';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

// import store from './redux/store/index';
// import * as TYPE from './redux/actions';

const App = Loadable({
  loader: () => import('./App'),
  loading: () => null,
  // React.createElement(
  //   // class extends React.Component {
  //   //   render() {
  //   //     return null;
  //   //   }
  //   //   componentDidMount() {
  //   //     store.dispatch({ type: TYPE.ADD_LOADING_COUNT });
  //   //   }
  //   //   componentWillUnmount() {
  //   //     store.dispatch({ type: TYPE.SUB_LOADING_COUNT });
  //   //   }
  //   // },
  //   'div',
  // ),
});

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(React.createElement(App), root);
