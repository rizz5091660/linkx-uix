import React from "react";
import PropTypes from "prop-types";
import facebook from "../../images/icon/facebook.png";
import instagram from "../../images/icon/instagram.png";
import youtube from "../../images/icon/youtube.png";
import shop from "../../images/icon/online-store.png"
import signal from "../../images/icon/signal.gif"
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "shards-react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';

const UserProfileOverview = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <NavLink to="/profile">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={userDetails.avatar}
            alt={userDetails.name}
            width="110"
          />
        </div>
        <h4 className="mb-0">{userDetails.name}</h4>
      </NavLink>
    </CardHeader>
    <CardBody>
      <Row>
        <Col className="ml-4" lg="12">
          <div style={{ display: "inline" }}><a href="https://www.youtube.com/user/natefiggs"><img src={youtube} width="30" /></a> </div>
          <div style={{ display: "inline" }}><span className="text-muted  mb-2">{userDetails.jobTitle}</span></div>
        </Col>
      </Row>
      <Row>
        <Col className="ml-4" lg="12">
          <div style={{ display: "inline" }}><a href="https://www.instagram.com/natefiggs/"><img src={instagram} width="30" /></a> </div>
          <div style={{ display: "inline" }}><span className="text-muted  mb-2">{userDetails.jobTitle2}</span></div>
        </Col>
      </Row>
      <Row>
        <Col className="ml-4" lg="12">
          <div style={{ display: "inline" }}><a href="https://www.facebook.com/nathan.figueroa.12"><img src={facebook} width="30" /></a> </div>
          <div style={{ display: "inline" }}><span className="text-muted  mb-2">{userDetails.jobTitle3}</span></div>
        </Col>
      </Row>
      <Row>
        <Col className="ml-4" lg="12">
          <div style={{ display: "inline" }}><a href="#"><img src={shop} width="30" /></a> </div>
          <div style={{ display: "inline" }}><span className="text-muted  mb-2">My Shop</span></div>
        </Col>
      </Row>
      <div className="border-bottom p-2 mb-2"></div>
      <Row>
        <Col lg="12">
          <span>Who's viewed your profile</span><strong className="text-muted  mb-2"> 28 </strong>
        </Col>
        <Col lg="12">
          <span>Who's requested for collaboration</span><strong className="text-muted  mb-2"> 5 </strong> <img src={signal} width="30" />
        </Col>
        <Col lg="12">
          <span>Who's viewed of your post</span><strong className="text-muted mb-2"> 124 </strong>
        </Col>
      </Row>
      <div className="border-bottom p-2 mb-2"></div>
      <Row>
        <Col lg="12">
          <span>{userDetails.metaValue}</span>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

UserProfileOverview.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserProfileOverview.defaultProps = {
  userDetails: {
    name: "Nathan Figueroa",
    avatar: require("./../../images/avatars/nathanfigueroa.jpg"),
    jobTitle: "421,420 followers",
    jobTitle2: "1,011 followers",
    jobTitle3: "3,656 followers",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Looking forward for food projects!!🍕🍔🌯 "
  }
};

export default UserProfileOverview;
