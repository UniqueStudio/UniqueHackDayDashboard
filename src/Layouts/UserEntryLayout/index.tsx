import * as React from 'react';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Layout from 'antd/es/layout';

import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import 'antd/lib/layout/style/index.css';

import GlobalHeader from '../../Views/GlobalHeader/index';

export default class UserEntryLayout extends React.Component {
  render() {
    return (
      <Layout>
        <GlobalHeader />
        <Layout.Content>
          <Row style={{ height: '100%' }}>
            <Col xs={24} sm={16} md={8}>
              {this.props.children}
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}
