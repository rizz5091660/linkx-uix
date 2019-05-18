import React from 'react';
import { Redirect } from 'react-router-dom';

import { DefaultLayout } from './layouts';

import UserProfile from './views/profile/Index';
import ComponentsOverview from './views/ComponentsOverview';
import Feed from './views/feed/Index';
import Login from './views/Login';
import EditProfile from './views/profile/Edit';
import SearchProject from './views/project/Index';
import SearchOffer from './views/offer/Index';
import LoginLayout from "./layouts/Login";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/feed",
    layout: DefaultLayout,
    component: Feed
  },
  {
    path: "/project",
    layout: DefaultLayout,
    component: SearchProject
  },
  {
    path: "/offer",
    layout: DefaultLayout,
    component: SearchOffer
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/login2",
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/editProfile",
    layout: DefaultLayout,
    component: EditProfile
  }
];
