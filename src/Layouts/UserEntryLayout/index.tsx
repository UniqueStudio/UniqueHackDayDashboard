import * as React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Layout from 'antd/es/layout';

import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import 'antd/lib/layout/style/index.css';

import GlobalHeader from '../../Views/GlobalHeader/index';

import cls from '../DashboardLayout/layout.less';

export default class UserEntryLayout extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <GlobalHeader />
        <Layout.Content className={cls['content-header-wrapper']}>
          <div className={cls['login-wrapper']}>
            <Row className={cls['login-card-wrapper']}>
              <Col xs={24} sm={16} md={12} className={cls['login-card-col']}>
                {this.props.children}
              </Col>
            </Row>
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}
