
import React from "react";
import UserProfileOverview from "../components/profile/UserProfileOverview";
import Follow from "../components/follow/Follow";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    }

  }

  componentDidMount() {
    fetch("http://www.mocky.io/v2/5c79ce794900007000a5a651").then((Response) => Response.json())
    .then((findresponse) => {this.setState({ feeds: findresponse})})
  }

  render() {
    const {
      feeds
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4" />
        <div className="centerPosition">
          <Row>
            <Col lg="3">
              <UserProfileOverview />
            </Col>
            <Col lg="5">
              <Row>
                <Col lg="12" sm="12" >
                  <Card small className="card-post mb-4">
                    <CardBody>
                      <h5 className="card-title">
                        Start a post
                  </h5>
                      <p className="card-text text-muted">

                      </p>
                    </CardBody>
                    <CardFooter className="border-top d-flex" style={{ backgroundColor: "#f3f6f8" }}>
                      <span className="card-post__author-name">
                        <b style={{ color: "#0073b1" }}>Share a project</b> on LinkedIn
                      </span>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>



              {feeds.map((post, idx) => (
                <Row>
                  <Col lg="12" md="12" sm="12" className="mb-4" key={idx}>
                    <Card small className="card-post card-post--1">
                      <div style={{ padding: "1rem" }} >
                        <b><a href="#" className="text-fiord-blue">{post.likeBy}  </a></b> likes this
                </div>
                      <div
                        className="card-post__image"
                        style={{ backgroundImage: `url('${post.backgroundImage}')` }}
                      >
                        <Badge
                          pill
                          className={`card-post__category bg-${post.categoryTheme}`}
                        >
                          {post.category}
                        </Badge>
                        <div className="card-post__author d-flex">
                          <a
                            href="#"
                            className="card-post__author-avatar card-post__author-avatar--small"
                            style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                          >
                            Written by {post.author}
                          </a>
                        </div>
                      </div>
                      <CardBody>
                        <h5 className="card-title">
                          <a href="#" className="text-fiord-blue">
                            {post.title}
                          </a>
                        </h5>
                        <p className="card-text d-inline-block mb-3">{post.body}</p>
                        <span className="text-muted">{post.date}</span>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col lg="4">
              <Follow type="feed" />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

}


export default Feed;
