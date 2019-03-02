import React from "react";
import PropTypes from "prop-types";
import facebook from "../../images/icon/facebook.png";
import instagram from "../../images/icon/instagram.png";
import youtube from "../../images/icon/youtube.png";
import shop from "../../images/icon/online-store.png"
import Projects from "./Projects";
import UserStats from "./UserStats";

import {
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
  CardBody,
  FormSelect,
  Badge,
  Container
} from "shards-react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        name: "Nathan Figueroa",
        backgroundImage: require("./../../images/content-management/channels4_banner.jpg"),
        avatar: require("./../../images/avatars/nathanfigueroa.jpg"),
        jobTitle: "421,420 subscribers",
        jobTitle2: "1,011 followers",
        jobTitle3: "3,656 followers",
        performanceReportTitle: "Workload",
        performanceReportValue: 74,
        metaTitle: "Description",
        metaValue:
          "Looking forward for food projects!!🍕🍔🌯 "
      }
    }
  }

  render() {
    const {
      userDetails,
      smallStats
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg="12" className="mb-2">
            <Card className="card-post card-post--1">
              <CardBody>
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${userDetails.backgroundImage})` }} >

                <div className="card-post__author d-flex">
                  <a
                    href="#"
                    className="card-post__author-avatar" 
                    style={{ backgroundImage: `url('${userDetails.avatar}')`,width:"5rem",height:"5rem" }}>
                  </a>
                </div>
              </div>
                <Row style={{padding:"10px"}}>
                  <Col className="mb-6" style={{marginTop:"25px"}}>
                    <h4 className="mb-0">{userDetails.name}</h4>
                    <h6>Eating | Training | Life</h6>
                    <h6>Coral Springs, Florida 33067</h6>
                    <Badge pill className={`bg-info`} > Food</Badge>{"  "}
                    <Badge pill className={`bg-warn`} > Fitnes</Badge>
                  </Col>
                  <Col className="mb-6" style={{marginTop:"10px"}}>
                    <Row>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="https://www.youtube.com/user/natefiggs"><img src={youtube} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">{userDetails.jobTitle}</span></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="https://www.instagram.com/natefiggs/"><img src={instagram} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">{userDetails.jobTitle2}</span></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="https://www.facebook.com/nathan.figueroa.12"><img src={facebook} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">{userDetails.jobTitle3}</span></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="#"><img src={shop} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">My Shop</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-12 border-top" style={{padding:"10px"}} >
                     Looking forward for food projects!!🍕🍔🌯 
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="mb-2">
            <UserStats />
          </Col>
        </Row>
        <Row>
        <Col lg="12" className="mb-2">
            <Projects />
          </Col>
        </Row>
      </div>
    );
  }
}
export default UserDetails;