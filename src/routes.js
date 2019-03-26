import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import UserProfile from "./views/UserProfile";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import BlogPosts from "./views/BlogPosts";
import Feed from "./views/Feed";
import Login from "./views/Login";
import EditProfile from "./views/EditProfile"
import SearchProject from "./views/SearchProject";

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
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
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
    path: "/editProfile",
    layout: DefaultLayout,
    component: EditProfile
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
