import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/profile/UserDetails";
import UserAccountDetails from "../components/profile/UserAccountDetails";
import Follow from "../components/follow/Follow";


const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
    </Row>
    <Row>
      <Col lg="8">
        <UserDetails />
      </Col>
      <Col lg="4">
        <Follow type="userdetail"/>
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
