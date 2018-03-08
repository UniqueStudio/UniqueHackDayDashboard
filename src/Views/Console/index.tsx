import * as React from 'react';
import Button from 'antd/lib/button';

import 'ant-design-pro/dist/ant-design-pro.min.css';
import 'antd/lib/button/style/css';

import Status from '../../Components/Status/index';

export default class Console extends React.Component {
  render() {
    return (
      <Status
        type="success"
        statusText="通过审核"
        buttons={this.renderStatusButtons()}
      />
    );
  }

  renderStatusButtons() {
    return [
      <Button key={0} type="primary">组队</Button>,
      <Button key={1} type="danger">退出比赛</Button>,
    ];
  }
}
