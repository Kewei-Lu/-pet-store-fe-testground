import React from 'react';
import { Navigate } from 'react-router-dom';

import Account from '../pages/Account/Account';
import IndexPage from '../pages/IndexPage/IndexPage';
import Money from '../pages/money/Money';

const routers = [
  // redirect
  {
    path: '',
    element: <IndexPage />,
  },
  {
    path: '/index',
    element: <IndexPage />,
  },
  {
    path: '/account',
    element: <Account />,
  },
];

export default routers;
