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
} from "shards-react";
import { Container } from "react-bootstrap";
import { UserService } from "../services/User.service";

class Login extends Component {
  constructor() {
    super();
    this.registerSubmit = this.registerSubmit.bind(this);
    this.state = {};
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  goToProfile(pAccountId,url){
    this.props.history.push({
        pathname: url,
        state: { accountId: pAccountId }
      })
  }

  registerSubmit(event) {
    event.preventDefault();
    let isValid = UserService.validate(this.state.regFirstName, this.state.regLastName, this.state.regEmail, this.state.regPassword, this.state.regConfirmPassword);
    if (isValid) {
      UserService.add(this.state.regFirstName, this.state.regLastName, this.state.regEmail, this.state.regPassword)
        .then(response => {
          if (response.status == 200) {
            this.goToProfile(response.data,"/profile");
          } else {
            alert("Registration error :: " + response.message);
          }
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/feed" />;
    }
    return (
      <Container style={{ height: "100%" }} className="py-4">
        <Row>
          <Col md="6"></Col>
          <Col md="6" style={{ paddingRight: "10%" }}>
            <Form id="registerForm" onSubmit={this.registerSubmit}>
              <FormGroup>
                <h4 style={{ color: "#0073b1" }}>Create an account</h4>
                <span><b>One step closer to be a Professional Influencer</b></span>
              </FormGroup>
              <Row form>
                <Col md="6">
                  <FormInput
                    required
                    placeholder="First Name"
                    name="regFirstName"
                    value={this.state.regFirstName}
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
                <Col md="6" className="form-group">
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
              <FormGroup>
                <FormCheckbox
                  value={this.state.regAgree}
                  name="regAgree"
                  onChange={e => this.handleChange(e)}
                >
                  {/* eslint-disable-next-line */} I agree with your <a href="#">Privacy Policy</a>.
                  </FormCheckbox>
              </FormGroup>
              <Button type="submit">Create</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
