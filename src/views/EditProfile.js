import React from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  FormCheckbox,
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Button
} from "shards-react";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    };
  }

  render() {
    return (
      <div className="centerPosition">
        <row>
          <Col lg="12" sm="12">
            <Card small className="card-post mb-4">
              <CardHeader
                className="border-top d-flex"
                style={{ backgroundColor: "#f3f6f8" }}
              >
                <span className="card-post__author-name">
                  <b style={{ color: "#0073b1" }}>Photo</b>
                </span>
              </CardHeader>
              <CardBody>
                <h5 className="card-title">Start a post</h5>
                <p className="card-text text-muted" />
              </CardBody>
            </Card>
          </Col>
        </row>
        <row>
          <Col lg="12" sm="12">
            <Card small className="card-post mb-4">
              <CardHeader
                className="border-top d-flex"
                style={{ backgroundColor: "#f3f6f8" }}
              >
                <span className="card-post__author-name">
                  <b style={{ color: "#0073b1" }}>Account</b>
                </span>
              </CardHeader>
              <CardBody>
                <h5 className="card-title">Start a post</h5>
                <p className="card-text text-muted" />
              </CardBody>
            </Card>
          </Col>
        </row>
        <row>
          <Col lg="12" sm="12">
            <Card small className="card-post mb-4">
              <CardHeader
                className="border-top d-flex"
                style={{ backgroundColor: "#f3f6f8" }}
              >
                <span className="card-post__author-name">
                  <b style={{ color: "#0073b1" }}>Details</b>
                </span>
              </CardHeader>
              <CardBody>
                <ListGroup flush>
                  <ListGroupItem className="p-3">
                    <Row>
                      <Col>
                        <Form>
                          <Row form>
                            <Col md="6" className="form-group">
                              <label htmlFor="feEmailAddress">Email</label>
                              <FormInput
                                id="feEmailAddress"
                                type="email"
                                placeholder="Email"
                              />
                            </Col>
                            <Col md="6">
                              <label htmlFor="fePassword">Password</label>
                              <FormInput
                                id="fePassword"
                                type="password"
                                placeholder="Password"
                              />
                            </Col>
                          </Row>

                          <FormGroup>
                            <label htmlFor="feInputAddress">Address</label>
                            <FormInput
                              id="feInputAddress"
                              placeholder="1234 Main St"
                            />
                          </FormGroup>

                          <FormGroup>
                            <label htmlFor="feInputAddress2">Address 2</label>
                            <FormInput
                              id="feInputAddress2"
                              placeholder="Apartment, Studio or Floor"
                            />
                          </FormGroup>

                          <Row form>
                            <Col md="6" className="form-group">
                              <label htmlFor="feInputCity">City</label>
                              <FormInput id="feInputCity" />
                            </Col>
                            <Col md="4" className="form-group">
                              <label htmlFor="feInputState">State</label>
                              <FormSelect id="feInputState">
                                <option>Choose...</option>
                                <option>...</option>
                              </FormSelect>
                            </Col>
                            <Col md="2" className="form-group">
                              <label htmlFor="feInputZip">Zip</label>
                              <FormInput id="feInputZip" />
                            </Col>
                          </Row>
                          <Button type="submit">Create New Account</Button>
                        </Form>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </row>
      </div>
    );
  }
}

export default EditProfile;
