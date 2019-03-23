import React, { Component } from "react";
import { Redirect } from "react-router";
import {
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  Button,
  FormCheckbox,
  Card,
  CardBody,
  CardHeader
} from "shards-react";

class Login extends Component {
  constructor() {
    super();
    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.state = {};
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginSubmit(event) {
    event.preventDefault();

    const formLogin = {
      username: this.state.loginName,
      password: this.state.loginPassword
    };

    fetch("http://localhost:8080/api/login/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formLogin)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response != null && response.responseCode == "0") {
          this.setState({ redirect: true });
        } else {
          alert("Login error :: " + response.desc);
        }
      });
  }

  registerSubmit(event) {
    event.preventDefault();

    if (this.state.regPassword === this.state.regConfirmPassword) {
      const formRegister = {
        firstName: this.state.regFirstName,
        lastName: this.state.regLastName,
        email: this.state.regEmail,
        password: this.state.regPassword
      };

      fetch("http://localhost:8080/api/account/create", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formRegister)
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response != null && response.responseCode == "0") {
            alert("Registration Success, please Login!");
          } else {
            alert("Registration error :: " + response.desc);
          }
        });
    } else {
      alert("Password doesn't match");
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/feed" />;
    }
    return (
      <Row>
        <Col sm="12" md="5">
        <Card small className="card-post mb-4">
              <CardHeader
                className="border-top d-flex"
                style={{ backgroundColor: "#f3f6f8" }}
              >
                <span className="card-post__author-name">
                  <b style={{ color: "#0073b1" }}>Login</b>
                </span>
              </CardHeader>
              <CardBody>
            <Form onSubmit={this.loginSubmit} id="loginForm">
              <FormGroup>
                <FormInput
                  required
                  placeholder="Username or email"
                  name="loginName"
                  value={this.state.loginName}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  required
                  type="password"
                  placeholder="Password"
                  name="loginPassword"
                  value={this.state.loginPassword}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
          </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="6">
        <Card small className="card-post mb-4">
              <CardHeader
                className="border-top d-flex"
                style={{ backgroundColor: "#f3f6f8" }}
              >
                <span className="card-post__author-name">
                  <b style={{ color: "#0073b1" }}>Register</b>
                </span>
              </CardHeader>
              <CardBody>
            <Form id="registerForm" onSubmit={this.registerSubmit}>
              <Row form>
                <Col md="4">
                  <FormInput
                    required
                    placeholder="First Name"
                    name="regFirstName"
                    value={this.state.regFirstName}
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
                <Col md="4" className="form-group">
                  <FormInput
                    required
                    placeholder="Last Name"
                    name="regLastName"
                    value={this.state.regLastName}
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </Row>
              <FormGroup>
                <FormInput
                  required
                  placeholder="Email"
                  name="regEmail"
                  value={this.state.regEmail}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  required
                  type="password"
                  placeholder="Password"
                  name="regPassword"
                  value={this.state.regPassword}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  required
                  type="password"
                  placeholder="Retype Password"
                  name="regConfirmPassword"
                  value={this.state.regConfirmPassword}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <Col>
                <FormGroup>
                  <FormCheckbox
                    value={this.state.regAgree}
                    name="regAgree"
                    onChange={e => this.handleChange(e)}
                  >
                  {/* eslint-disable-next-line */} I agree with your <a href="#">Privacy Policy</a>.
                  </FormCheckbox>
                </FormGroup>
              </Col>
              <Button type="submit">Create</Button>
            </Form>
          </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Login;
