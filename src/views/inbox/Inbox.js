import React from "react";
import { Container, Row, Col } from "shards-react";
import MainInbox from "./MainInbox";

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <div className="centerPosition">
          <MainInbox />
        </div>
      </Container>
    );
  }
}

export default Inbox;