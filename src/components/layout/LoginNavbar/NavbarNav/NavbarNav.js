import React from "react";
import { Nav } from "shards-react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import home from "./../../../../assets/images/icon/home.png";

export default () => (
  <Nav navbar className="border-left flex-row">
    <NavLink to="/feed"> <img src={home} width="45" height="45" style={{"padding":"5px","marginTop":"3px","marginBottom":"5px" }}/></NavLink>
  </Nav>
);
