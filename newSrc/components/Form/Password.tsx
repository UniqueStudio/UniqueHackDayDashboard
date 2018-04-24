import * as React from 'react';
import { patterns } from '../../utils/patterns';

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
