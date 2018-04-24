import * as React from 'react';
import { patterns } from '../../utils/patterns';

import Text from './Text';

export default function Phone(props: { [k: string]: any; label?: boolean }) {
  const { label, ...rest } = props;
  return (
    <Text
      required={true}
      fieldName="手机号码"
      id="phone"
      label={label ? '手机号码' : undefined}
      iconType="phone"
      pattern={patterns.password}
      {...rest}
    />
  );
}
