import * as React from 'react';
// import * as PropTypes from 'prop-types';

// import Form from 'antd/es/form';
// import Input from 'antd/es/input';
// import Icon from 'antd/es/icon';

import { patterns } from '../../lib/patterns';

import Text from './Text';

export default function Username(props: { label?: boolean; [k: string]: any }) {
  const { label, ...rest } = props;
  return (
    <Text
      required={true}
      fieldName="用户名"
      id="username"
      label={label ? '用户名' : undefined}
      iconType="user"
      pattern={patterns.username}
      {...rest}
    />
  );
}
