import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import App from './App';
import Loadable from 'react-loadable';

const App = Loadable({
  loader: () => import('./App'),
  loading: () => React.createElement('div', { children: '加载中' }),
});

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(React.createElement(App), root);
