import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import 'antd/dist/antd.css';

import main from './styles/main.less';

const root = document.getElementById('root') as HTMLElement;
root.setAttribute('id', main.root);

ReactDOM.render(React.createElement(App), root);
