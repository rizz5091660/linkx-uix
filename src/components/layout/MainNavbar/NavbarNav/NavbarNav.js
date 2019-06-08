import React from "react";
import { Nav } from "shards-react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Notifications from "./Notifications";
import UserActions from "./UserActions";
import home from "./../../../../assets/images/icon/home.png";
import friends from "./../../../../assets/images/icon/friends.png";
import jobs from "./../../../../assets/images/icon/jobs.png";

export default () => (
  <Nav navbar className="flex-row">
    <NavLink to="/feed"><div style={{padding:"2px 10px"}}> <img src={home} width="30" /> <br/> <span style={{color:"#FFFF"}}> Home </span> </div> </NavLink>
    <NavLink to="/feed"><div style={{padding:"2px 10px"}}> <img src={friends} width="30" /> <br/> <span style={{color:"#FFFF"}}> Network </span>  </div></NavLink>
    <NavLink to="/feed"><div style={{padding:"2px 10px"}}> <img src={jobs} width="30" /> <br/> <span style={{color:"#FFFF"}}> Message </span>  </div></NavLink>
    <Notifications />
    <UserActions />
  </Nav>
);
