
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
  CardHeader,
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
    fetch("http://localhost:8080/api/post/account/398765f0-4220-11e9-8972-aca63e449b3c/follow").then((Response) => Response.json())
      .then((findresponse) => { this.setState({ feeds: findresponse }) })
  }

  render() {
    const {
      feeds
    } = this.state;
    const DATE_OPTIONS = {  month: 'short', day :'numeric' };
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



              {feeds.map((feed) => (
                <Row key={feed.id}>
                  <Col lg="12" md="12" sm="12" className="mb-4">
                    <Card small className="card-post card-post--1">
                      <div style={{ padding: "1rem" }} >
                          <Badge pill className={`card-post__category bg-dark`}>Business</Badge>                       
                          <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${feed.avatar}')` }}></div>
                          <div className="profile-name-feed">
                            {feed.firstName + " " + feed.lastName}<br/>
                            <span className="text-muted">{(new Date(feed.date)).toLocaleDateString('en-US', DATE_OPTIONS)} </span>
                          </div>
                     </div>
                      <div className="card-post__image" style={{ backgroundImage: `url('${feed.postBanner}')` }}></div>
                      <CardBody>
                        <h5 className="card-title">
                          <a href="#" className="text-fiord-blue">
                            {feed.title}
                          </a>
                        </h5>
                        <p className="card-text d-inline-block mb-3">{feed.content}</p> 
                      </CardBody>
                      <div class="border-top feed">50 comments 20 likes</div>
                      <div class="border-top feed-button">
                            <Button size="sm" theme="secondary" className="mb-2 mr-1" style={{flex: 1,width:"30%"}}>like </Button>
                            <Button size="sm" theme="secondary" className="mb-2 mr-1" style={{flex: 1,width:"30%"}}>Comment </Button>
                            <Button size="sm" theme="secondary" className="mb-2 mr-1" style={{flex: 1,width:"30%"}}>Share </Button>
                      </div>
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
