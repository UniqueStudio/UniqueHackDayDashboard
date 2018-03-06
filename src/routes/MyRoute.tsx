// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

export interface IMyRouteProps {
  path: string;
  children?: IMyRouteProps[];
  exact?: boolean;
  component: React.ComponentType<any>;
}
const concatPath = (a: string, b: string) => {
  return (a + b).replace(/\/\//g, '/');
};

const MyRoute = (props: IMyRouteProps): React.ReactElement<IMyRouteProps> => (
  <Route
    path={props.path}
    exact={props.exact}
    component={props.children
      // 有children的时候，要封一层传入children
      ? (localProps: any) =>
        <props.component {...localProps}>
          {
            <Switch>
              {
                (props.children || []).map((child) =>
                  <MyRoute key={child.path} {...child} path={concatPath(localProps.match.path, child.path)}/>,
                )
              }
            </Switch>
          }
        </props.component>
      // 无children, 直接传该组件
      : props.component
    }
  />
);

export default MyRoute;
