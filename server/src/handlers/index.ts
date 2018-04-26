import loginAndReg from './login-and-reg';

import { Db } from 'mongodb';
import { AnyAction } from 'redux';
import { RootState } from '../../../src/redux/reducers/index';

const sideEffectHandlersMap: { [k: string]: SideEffectHandler } = {
  ...loginAndReg,
};

export default sideEffectHandlersMap;

export type SideEffectHandler = (
  sideEffect: AnyAction,
  state: RootState,
  db: Db,
) => Promise<AnyAction | AnyAction[] | null>;
