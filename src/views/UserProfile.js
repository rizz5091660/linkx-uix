import React from "react";
import { Container, Row, Col } from "shards-react";

import UserProfileDetail from "../components/profile/UserProfileDetail";
import Follow from "../components/follow/Follow";


const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4"/>
    <div className="centerPosition">
    <Row>
      <Col lg="8"> 
        <UserProfileDetail/>
      </Col>
      <Col lg="4">
        <Follow type="userdetail"/>
      </Col>
    </Row>
    </div>
  </Container>
);

export default UserProfileLite;
