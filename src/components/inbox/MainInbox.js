import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";
import write from "../../images/icon/edit.png";
import settings from "../../images/icon/settings.png";
import routes from "../../routes";

export default class MainInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: 0,
      data: [],
      messageList: [],
      inputValue: ""
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/chat/list/0c26efd8-45e8-11e9-a64b-2afa6a2473d7")
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  addMessage(e) {
    alert(this.state.inputValue)
    this.refs.input.clear();
    var list = this.state.messageList;
    list.push();
    this.setState({
      messageList: list
    });
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  itemClick(event) {
    alert(event.id + " " + event.title);
    fetch("http://localhost:8080/api/chat/msg/0c26efd8-45e8-11e9-a64b-2afa6a2473d7/" + event.id)
    .then(res => res.json())
    .then(json => this.setState({ messageList: json }));
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Container style={{ height: "100%", width: "100%" }}>
              <Row>
                <div
                  className="border-top ml-auto my-auto mr-2 msg-overlay"
                  style={{ width: "100%" }}
                >
                  <div style={{ display: "inline", padding: "0 5px 0 170px" }}>
                    <img src={write} width="20" height="20" />
                  </div>
                  <div style={{ display: "inline", padding: "0 5px" }}>
                    <img src={settings} width="20" height="20" />
                  </div>
                </div>
              </Row>
              <Row>
                <div
                  className="border-top ml-auto my-auto mr-2 msg-overlay"
                  style={{
                    width: "100%",
                    overflow: "auto",
                    height: "400px"
                  }}
                >
                  <ChatList
                    className="chat-rce-container-clist"
                    dataSource={this.state.data}
                    onClick={this.itemClick}
                  />
                </div>
              </Row>
            </Container>
          </Col>
          <Col>
            <div style={{ width: "100%" }}>
              <MessageList
                className="message-inbox"
                lockable={true}
                downButtonBadge={1}
                dataSource={this.state.messageList}
              />

              <Input
                placeholder="Insert your message here"
                defaultValue=""
                ref="input"
                name="btn1"
                multiline={true}
                // buttonsFloat='left'
                onChange={e => this.handleChange(e)}
                onKeyPress={e => {
                  if (e.shiftKey && e.charCode === 13) {
                    return true;
                  }
                  if (e.charCode === 13) {
                    this.handleChange(e)
                    this.addMessage();
                    e.preventDefault();
                    return false;
                  }
                }}
                rightButtons={<Button text="Send" onClick={this.addMessage} />}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
