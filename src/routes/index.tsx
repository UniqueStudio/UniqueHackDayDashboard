import * as React from 'react';
import { Switch } from 'react-router';

import MyRoute from './MyRoute';
import { IMyRouteProps } from './MyRoute';
import DashboardLayout from '../Layouts/DashboardLayout';
// import Dashboard from '../Views/Dashboard';

const routesConfig: IMyRouteProps[] = [{
  path: '/',
  exact: false,
  component: DashboardLayout,
  children: [
    {
      path: '/hehe',
      exact: true,
      component: () => ( <div>1111</div> ),
    },
  ],
}];

export default function Root() {
  return (
    <Switch>
      {routesConfig.map((route) => <MyRoute key={route.path} {...route}/>)}
    </Switch>
  );
}
