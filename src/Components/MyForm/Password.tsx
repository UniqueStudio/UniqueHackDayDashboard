import * as React from 'react';
// import * as PropTypes from 'prop-types';

// import Form from 'antd/es/form';
// import Input from 'antd/es/input';
// import Icon from 'antd/es/icon';

import { patterns } from '../../lib/patterns';

import Text from './Text';

export default function Password(props: { [k: string]: any; label?: boolean }) {
  const { label, ...rest } = props;
  return (
    <Text
      required={true}
      fieldName="密码"
      id="password"
      label={props.label ? '密码' : undefined}
      inputType="password"
      iconType="lock"
      pattern={patterns.password}
      {...rest}
    />
  );
}
