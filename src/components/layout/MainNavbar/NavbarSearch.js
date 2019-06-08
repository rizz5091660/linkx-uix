import React from "react";
import logo from "./../../../assets/images/icon/linkedin-icon.png";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  FormSelect
} from "shards-react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';

export default () => (
  <Form className="main-navbar__search d-none d-md-flex d-lg-flex">
   <NavLink to="/feed"><img src={logo} width="45" height="45" style={{"padding":"5px","marginTop":"3px","marginBottom":"5px" }}/></NavLink>
   <FormSelect style={{margin:"10px 2px",height:"33px",width:"200px" }}>
            <option>Company</option>
            <option>People</option>
            <option>Projects</option>
            <option>Offers</option>
     </FormSelect>
    <InputGroup seamless className="ml-2"  style={{"height":"30px","marginTop":"10px","width":"300px"}}>
      <InputGroupAddon type="prepend">
        <InputGroupText >
          <i className="material-icons">search</i>
        </InputGroupText>
      </InputGroupAddon>
      <FormInput
        className="navbar-search"
        placeholder="Search"
      />
    </InputGroup>
  </Form>
);
