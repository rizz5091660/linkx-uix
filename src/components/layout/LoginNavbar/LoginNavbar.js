import React from "react";
import classNames from "classnames";
import {
  Container, 
  Form,
  FormInput,
  Button,
  Row,
  Col
} from "shards-react";

import {LoginService} from "../../../services/Login.service";

class LoginNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginNavbar: true
    }
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginSubmit(event) {
    event.preventDefault();
    LoginService.login(this.state.loginName,this.state.loginPassword)
    .then(response => {
        if (response != null && response.responseCode == "0") {
          this.setState({ redirect: true });
        } else {
          alert("Login error :: " + response.desc);
        }
      });
  }

  render() {
    let stickyTop = true;
    const classes = classNames(
      "main-navbar",
      "bg-black",
      stickyTop && "sticky-top"
    );
    return (<div className={classes} style={{ textAlign: "left",padding:"0" }}>
      <Container className="py-2">
        <Form onSubmit={this.loginSubmit} id="loginForm">
          <Row>
            <Col md="6"> </Col>
            <Col md="6" style={{ display: "flex",flexDirection: "row" }}>
              <FormInput style={{width:"40%", margin:"0 5px 0 0", fontSize:"10px"  }} required placeholder="Username or email" name="loginName" value={this.state.loginName} onChange={e => this.handleChange(e)} /> 
              <FormInput type="password" style={{width:"40%", margin:"0 5px",fontSize:"10px" }} required placeholder="Password" name="loginPassword" value={this.state.loginPassword} onChange={e => this.handleChange(e)} /> 
              <Button type="submit">Login</Button> 
            </Col>
          </Row>
        </Form>

      </Container>
    </div>);

  }
}
export default LoginNavbar;
