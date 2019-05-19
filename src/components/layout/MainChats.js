import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";
import write from "../../assets/images/icon/edit.png";
import settings from "../../assets/images/icon/settings.png";
import routes from "../../routes";

export default class MainChats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: 0,
      data: [],
      messageList: []
    };

    this.IncrementItem = this.IncrementItem.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8040/test/dataSourceChat.php")
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

    fetch("http://127.0.0.1:8040/test/dataChat.php")
      .then(res => res.json())
      .then(json => this.setState({ messageList: json }));
  }

  addMessage(e) {
    alert(e)
    var list = this.state.messageList;
    this.setState({
      messageList: list
    });
  }

  itemClick(event) {
    alert(event.id + " " + event.title);
  }

  IncrementItem(event) {
    this.setState({ chats: this.state.chats + 1 });
  }
  DecreaseItem(event){
    this.setState({ chats: this.state.chats - 1 });
  }

  render() {
    const children = [];
    const ChildComponent = props => (
       <div
          style={{ right: props.number + "px" }}
          class="ml4 msg-overlay-conversation-bubble"
        >
          <MessageList
            className="message-list"
            lockable={true}
            downButtonBadge={1}
            dataSource={this.state.messageList}
          />

          <Input
            placeholder="Insert your message here"
            defaultValue=""
            // ref="input"
            id="btn1" 
            multiline={true}
            // buttonsFloat='left'
            onKeyPress={e => {
              if (e.shiftKey && e.charCode === 13) {
                return true;
              }
              if (e.charCode === 13) {
                // this.refs.input.clear();
                this.addMessage();
                e.preventDefault();
                return false;
              }
            }}
            rightButtons={
              <Button text="Send" onClick={this.addMessage} />
            }
          />
        </div>
    );
    const ParentComponent = props => (
      <div>
        {props.children}
      </div>
    );
    for (var i = 0; i < this.state.chats; i += 1) {
      var x = (i+1) * 360;
      children.push(<ChildComponent key={x} number={x} />);
    }

    return (
      <div>
        <ParentComponent>{children}</ParentComponent>
        <footer style={{ position: "fixed", bottom: "0", right: "0" }}>
          <Container style={{ height: "100%", width: "350px" }}>
            <Row>
              <div
                className="copyright border-top ml-auto my-auto mr-2 msg-overlay"
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
                  onClick={this.IncrementItem}
                />
              </div>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}
