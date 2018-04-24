import * as React from 'react';

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
      tip="允许4～16位字母、数字和下划线组合"
      {...rest}
    />
  );
}
