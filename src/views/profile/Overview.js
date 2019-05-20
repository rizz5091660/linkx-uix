import React from "react";
import signal from "../../assets/images/icon/signal.gif"
import { Card, CardHeader, CardBody, Row, Col } from "shards-react";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import offericon from '../../assets/images/icon/hot-sale.png';

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      profile
    } = this.props;
    const { accountId } = this.props
    return (
      <Card small className="mb-4 pt-3">
        <CardHeader style={{margin:"0 20%" }}>
          <NavLink to="/profile">
            <div className="card-post__author d-flex" style={{ cursor: "pointer"}}>
              <a className="card-post__author-avatar"
                style={{ backgroundImage: `url('${profile.avatar}')`, width: "7rem", height: "7rem" }}>
              </a>
            </div>
            <h4 className="mb-0">{profile.name}</h4>
            <span>{profile.position} at {profile.organization}</span>
          </NavLink>
        </CardHeader>
        <CardBody>
          {profile.accSocMedStats.map((asm, idx) => (
            <Row key={idx}>
              <Col className="ml-4" lg="12">
                <div style={{ display: "inline" }}><a href="https://www.youtube.com/user/natefiggs"><img src={asm.socMed.avatarFullPath} width="30" /></a> </div>
                <div style={{ display: "inline" }}><span className="text-muted  mb-2">{asm.totalFollower} followers</span></div>
              </Col>
            </Row>
          ))}
          <Row>
            <Col className="ml-4" lg="12">
              <div style={{ display: "inline" }}><a href="#"><img src={offericon} width="30" /></a> </div>
              <div style={{ display: "inline" }}><span className="text-muted  mb-2">My Offers</span></div>
            </Col>
          </Row>
          <div className="border-bottom p-2 mb-2"></div>
          <Row>
            <Col lg="12"> <span>Who's want to collab</span><strong className="text-muted  mb-2"> </strong> {profile.accLinkxStats.nReqCollab} <img src={signal} width="30" /></Col>
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

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    accountId: state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(Overview)

