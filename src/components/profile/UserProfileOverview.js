import React from "react";
import PropTypes from "prop-types";
import facebook from "../../images/icon/facebook.png";
import instagram from "../../images/icon/instagram.png";
import youtube from "../../images/icon/youtube.png";
import shop from "../../images/icon/online-store.png"
import signal from "../../images/icon/signal.gif"
import {Card,CardHeader,CardBody,Row,Col} from "shards-react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class UserProfileOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userDetails: {
        jobTitle: "421,420 followers",
        jobTitle2: "1,011 followers",
        jobTitle3: "3,656 followers",
        performanceReportTitle: "Workload",
        performanceReportValue: 74,
        metaTitle: "Description",
        metaValue:
          "Looking forward for food projects!!🍕🍔🌯 "
      },
      profile:{
        accSocMedStats:[{socMed:{}}],
        accLinkxStats:{}
      }
    }
  }
  componentDidMount() {
    fetch("http://localhost:8080/api/account/398765f0-4220-11e9-8972-aca63e449b3c/summary").then((Response) => Response.json())
    .then((findresponse) => {this.setState({ profile: findresponse})})
  }
  render(){
    const {
      userDetails,
      profile
    }= this.state;
    return(
      <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <NavLink to="/profile">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={profile.avatar}
              alt={profile.name}
              width="110"
            />
          </div>
          <h4 className="mb-0">{profile.name}</h4>
          <span>{profile.position} at {profile.organization}</span>
        </NavLink>
      </CardHeader>
      <CardBody>
      {profile.accSocMedStats.map((asm) => (
        <Row>
        <Col className="ml-4" lg="12">
          <div style={{ display: "inline" }}><a href="https://www.youtube.com/user/natefiggs"><img src={asm.socMed.avatarFullPath} width="30" /></a> </div>
          <div style={{ display: "inline" }}><span className="text-muted  mb-2">{asm.totalFollower} followers</span></div>
        </Col>
        </Row>
      ))}
        <Row>
          <Col className="ml-4" lg="12">
            <div style={{ display: "inline" }}><a href="#"><img src={shop} width="30" /></a> </div>
            <div style={{ display: "inline" }}><span className="text-muted  mb-2">My Shop</span></div>
          </Col>
        </Row>
        <div className="border-bottom p-2 mb-2"></div>
        <Row>
        <Col lg="12"> <span>Who's requested for collaboration</span><strong className="text-muted  mb-2"> </strong> {profile.accLinkxStats.nReqCollab} <img src={signal} width="30" /></Col>
          <Col lg="12"><span>Who's viewed your profile</span><strong className="text-muted  mb-2"> {profile.accLinkxStats.nViewProfile} </strong> </Col>
          <Col lg="12"><span>Who's viewed of your post</span><strong className="text-muted mb-2"> {profile.accLinkxStats.nViewPost}  </strong></Col>
        </Row>
        <div className="border-bottom p-2 mb-2"></div>
        <Row>
          <Col lg="12">
            <span>{profile.description}</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
    );


  }
}

export default UserProfileOverview;
