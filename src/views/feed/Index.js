
import React from "react";
import ShowLikes from "./Likes";
import UserProfileOverview from "../offer/UserProfileOverview";
import Follow from "../follow/Index";
import Explore from "../explore/Index";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedService } from "../../services/Feed.service";
import { connect } from 'react-redux'
import projecticon from '../../images/icon/project.png'
import offericon from '../../images/icon/hot-sale.png'
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';

import {
  Container, Row, Col, Card, CardBody, CardFooter, Badge, Button
} from "shards-react";
import FeedModal from "./Modal";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        accSocMedStats: [{ socMed: {} }],
        accLinkxStats: {}
      },
      feeds: [],
      likes: [],
      modalShow: false,
      index: 1,
      isOpen: false
    }
    this.showLikes = this.showLikes.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.feedModal = React.createRef();
  }

  componentDidMount() {
    this.getSummaryAccount();
    this.showFeed();
  }

  showEditModal(type) {
    this.setState({isOpen:false});
    this.feedModal.current.showEditModal(type);
  }

  getSummaryAccount() {
    fetch(process.env.REACT_APP_API + "account/" + this.props.accountId + "/summary").then((Response) => Response.json())
      .then((findresponse) => { this.setState({ profile: findresponse }) })
  }

  showLikes(pPostId) {
    FeedService.showLikes(pPostId)
      .then((result) => { this.setState({ likes: result, modalShow: true }) })
  }

  showComment(feed, idx) {
    let comments = [];
    FeedService.showComment(feed, idx)
      .then((result) => {
        comments = result;
        const newFeeds = [...this.state.feeds];
        newFeeds[idx].comments = comments;
        this.setState({ feeds: newFeeds });
      }
      );
  }

  handleClose() {
    this.setState({ show: false });
  }

  showFeed() {
    this.setState({ index: this.state.index + 1 });
    FeedService.showFeed(this.props.accountId, this.state.index)
      .then((result) => {
        if (this.state.feeds.length >= 1) {
          this.setState(
            {
              feeds: this.state.feeds.concat(result)
            })
        } else {
          this.setState({ feeds: result })
        }
      }
      )
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.showFeed();
    }, 1000);
  };


  render() {
    const {
      feeds,
      likes,
      modalShow,
      profile
    } = this.state;
    const { accountId } = this.props
    let modalClose = () => this.setState({ modalShow: false });
    const DATE_OPTIONS = { month: 'short', day: 'numeric' };
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header p-2" />
        <div className="centerPosition">
          <Row>
            <Col lg="3">
              <UserProfileOverview profile={profile} />
              <Explore />
            </Col>
            <Col lg="5">
              <Row>
                <Col lg="12" sm="12" >
                  <Card className="card-post mb-4">
                  <CardBody style={{ padding: "0rem" }} >
                      <Row>
                        <Col style={{ padding: "1rem 2rem" }}>
                          <div style={{ float: "left" }}>
                            <img
                              className="user-avatar rounded-circle mr-2"
                              src={profile.avatar}
                              alt={profile.name}
                              width="30"
                            />
                          </div>
                          <div style={{ float: "left", width: "70%", height: "100%", cursor: "pointer" }}>
                            <b style={{ color: "#0073b1", fontSize: "20px" }}>Start a post</b>
                          </div>
                        </Col>
                        <Col>
                          <div style={{ float: "right", height: "100%", padding: "10% 10% 10% 10%", textAlign: "center", cursor: "pointer", borderStyle: "solid", borderWidth: "1px", }}
                            onClick={this.showEditModal.bind(this, 'offer')}
                          >
                            <img src={offericon} alt="Offer" width="30" />
                          </div>
                          <div style={{ float: "right", height: "100%", padding: "10% 10% 10% 10%", textAlign: "center", cursor: "pointer", borderStyle: "solid", borderWidth: "1px", }}
                            onClick={this.showEditModal.bind(this, 'collab')}
                          >
                            <img src={projecticon} alt="Project" width="30" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
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
                        {feed.postBanner != null &&
                          <div className="card-post__image" style={{ backgroundImage: `url('${feed.postBanner}')` }}></div>
                        }
                        <CardBody>
                          {feed.projectId == null &&
                            <div>
                              <h5 className="card-title feed">
                                <a href="#" className="text-fiord-blue">
                                  {feed.title}
                                </a>
                              </h5>
                              <p className="feed card-text d-inline-block">{feed.content}</p>
                            </div>
                          }
                          {feed.projectId != null &&
                            <div>
                              <h5 className="card-title feed">
                                <a href="#" className="text-fiord-blue">
                                  {feed.projectName}
                                </a>
                              </h5>
                            </div>
                          }
                          <span dangerouslySetInnerHTML={{ __html: feed.projectDesc }}></span>
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
          <FeedModal ref={this.feedModal} accountId={this.props.accountId} />
        </div>
      </Container>
    );
  }

}
// Map Redux state to component props
function mapStateToProps(state) {
  return {
    accountId: state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(Feed)