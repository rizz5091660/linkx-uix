import React from "react";
import { Container, Row, Col } from "shards-react";

import UserProfileDetail from "../profile/Detail";
import Follow from "../follow/Index";
import {connect} from 'react-redux'

export class UserProfileLite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4" />
        <div className="centerPosition">
          <Row>
            <Col lg="8">
              <UserProfileDetail accountId={this.props.accountId} />
            </Col>
            <Col lg="4">
              <Follow type="userdetail" />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
      accountId : state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(UserProfileLite)