import React, { Component } from "react";

import {
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  Button
} from "shards-react";

class Login extends Component {
  constructor() {
    super();
    this.loginSubmit = this.loginSubmit.bind(this);
    this.state = {
      username: ' ',
      password: ' '
    };
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  loginSubmit(event) {
    event.preventDefault();

    const form = {
      name: this.state.loginName,
      email: this.state.loginPassword
     }
     
     alert(JSON.stringify(form));
    
    fetch("http://localhost:8080/api/login/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        alert(JSON.stringify(response));
      });
  
  }

  render() {
    return (
      <Row>
        <Col sm="12" md="5">
          <div align="center">
            <strong className="text-muted d-block mb-2">LOGIN</strong>
            <Form onSubmit={this.loginSubmit} id="loginForm">
              <FormGroup>
                <FormInput placeholder="Username or email" name="loginName" value={this.state.loginName} onChange={e => this.handleChange(e)} />
              </FormGroup>
              <FormGroup>
                <FormInput
                  type="password"
                  placeholder="Password"
                  name="loginPassword" 
                  value={this.state.loginPassword}
                  onChange={e => this.handleChange(e)} 
                />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
          </div>
        </Col>
        <Col sm="12" md="6">
          <div align="center">
            <strong className="text-muted d-block mb-2">NEW ACCOUNT</strong>
            <Form id="registerForm"> 
              <Row form>
                <Col md="4">
                  <FormInput placeholder="First Name" id="firstName" />
                </Col>
                <Col md="4" className="form-group">
                  <FormInput placeholder="Last Name" id="lastName" />
                </Col>
              </Row>
              <FormGroup>
                <FormInput placeholder="Email" id="email" />
              </FormGroup>
              <FormGroup>
                <FormInput
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              </FormGroup>
              <Button type="submit">Create</Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Login;
