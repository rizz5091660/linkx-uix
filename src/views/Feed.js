
import React from "react";
import ShowLikes from "../components/like/ShowLikes";
import UserProfileOverview from "../components/profile/UserProfileOverview";
import Follow from "../components/follow/Follow";
import Workplace from "../components/workplace/Workplace";
import InfiniteScroll from "react-infinite-scroll-component";
//import InfiniteScroll from 'react-infinite-scroller';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
} from "shards-react";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [{ comments: [{}] }],
      likes: [],
      modalShow: false,
      accountId: "398765f0-4220-11e9-8972-aca63e449b3c"
    }
    this.showLikes = this.showLikes.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.showFeed();
  }

  showFeed(){
    fetch("http://localhost:8080/api/post/account/398765f0-4220-11e9-8972-aca63e449b3c/follow").then((Response) => Response.json())
      .then((findresponse) => { this.setState({ feeds: findresponse }) })
  }

  handleClose() {
    this.setState({ show: false });
  }

  showLikes(pPostId) {
    fetch("http://localhost:8080/api/post/" + pPostId + "/like").then((Response) => Response.json())
      .then((findresponse) => { this.setState({ likes: findresponse, modalShow: true }) })
  }

  showComment(feed, idx) {
    let comments = [];
    fetch("http://localhost:8080/api/post/" + feed.id + "/comment").then((Response) => Response.json())
      .then((findresponse) => {
        comments = findresponse;
        const newFeeds = [...this.state.feeds];
        newFeeds[idx].comments = comments;
        this.setState({ feeds: newFeeds });
      }
      )
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        feeds: this.state.feeds.concat(this.state.feeds)
      });
    }, 1500);
  };


  render() {
    const {
      feeds,
      likes,
      modalShow,
      accountId
    } = this.state;
    let modalClose = () => this.setState({ modalShow: false });
    const DATE_OPTIONS = { month: 'short', day: 'numeric' };
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header p-2" />
        <div className="centerPosition">
          <Row>
            <Col lg="3">
              <UserProfileOverview accountId={accountId} />
              <Workplace accountId={accountId} />
            </Col>
            <Col lg="5">
              <Row>
                <Col lg="12" sm="12" >
                  <Card small className="card-post mb-4">
                    <CardBody>
                      <h5 className="card-title">Start a post</h5>
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
              <InfiniteScroll
                dataLength={this.state.feeds.length}
                next={this.fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>} >
                {feeds.map((feed, idx) => (
                  <Row key={feed.id}>
                    <Col lg="12" md="12" sm="12" className="mb-4">
                      <Card small className="card-post card-post--1">
                        <div style={{ padding: "1rem" }} >
                          <Badge pill className={`card-post__category bg-dark`}>Business</Badge>
                          <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${feed.avatar}')` }}></div>
                          <div className="feed profile-name-feed">
                            <b> {feed.firstName + " " + feed.lastName}</b><br />
                            <span className="text-muted">{(new Date(feed.date)).toLocaleDateString('en-US', DATE_OPTIONS)} </span>
                          </div>
                        </div>
                        <div className="card-post__image" style={{ backgroundImage: `url('${feed.postBanner}')` }}></div>
                        <CardBody>
                          <h5 className="card-title feed">
                            <a href="#" className="text-fiord-blue">
                              {feed.title}
                            </a>
                          </h5>
                          <p className="feed card-text d-inline-block">{feed.content}</p>

                          <div className="border-top feed-number-actions"><span onClick={() => this.showComment(feed, idx)}>{feed.nComment} comments </span> <span onClick={() => this.showLikes(feed.id)}>{feed.nLike} likes</span></div>
                          <div className="border-top feed-button-container">
                            <div className="feed-button-action"><a href="#" className="feed-hyperlink-action"><i className="material-icons mr-1">thumb_up</i>Like</a></div>
                            <div className="feed-button-action"><a href="#" className="feed-hyperlink-action"><i className="material-icons mr-1">comment</i>Comment</a></div>
                            <div className="feed-button-action"><a href="#" className="feed-hyperlink-action"><i className="material-icons mr-1">reply</i>Share</a></div>
                          </div>
                          <div>
                            {feed.comments.map((cmmt) => (
                              <div>
                                <div style={{ float: "left", paddingRight: ".5rem" }}> <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${cmmt.avatar}')` }}></div></div>
                                <div style={{ backgroundColor: "#eff3f4", padding: ".5rem", width: "80%", float: "left" }}> <div className="feed"><b>{cmmt.accountName}</b> {cmmt.content} </div></div>
                              </div>
                            ))}
                          </div>
                        </CardBody>

                      </Card>
                    </Col>
                  </Row>
                ))} 
              </InfiniteScroll> 
              <ShowLikes show={modalShow} onHide={modalClose} likes={likes} />
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
