import React from "react";
import shop from "../../images/icon/online-store.png"
import AccountProjects from "./AccountProjects";
import UserStats from "./UserStats";
import {connect} from 'react-redux'
import {
  Row,
  Col,
  Card,
  CardBody,
  Badge,
} from "shards-react";

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile:{
        states:{},
        socmedStats:[{socMed:{}}],
        brandSpecs:[{}],
        fName:null,
        lName:null
      },
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/account/"+this.props.accountId).then((Response) => Response.json()).then((findresponse)=> {
      this.setState({
        profile: findresponse
            })
        }
    )
}

  render() {
    const {
      profile
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg="12" className="mb-2">
            <Card className="card-post card-post--1">
              <CardBody>
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${profile.profileBannerFullpath})` }} >

                <div className="card-post__author d-flex">
                  <a
                    href="#"
                    className="card-post__author-avatar" 
                    style={{ backgroundImage: `url('${profile.avatarFullpath}')`,width:"7rem",height:"7rem" }}>
                  </a>
                </div>
              </div>
                <Row style={{padding:"10px"}}>
                  <Col className="mb-6" style={{marginTop:"25px"}}>
                    <h4 className="mb-0">{profile.fName} {profile.lName}</h4>
                    <h6>{profile.summary}</h6>
                    <h6>{profile.address}, {profile.states.name} {profile.postalCode}</h6>
                    {profile.brandSpecs.map((bs,idx) => (
                      <Badge key={idx} pill className={bs.badgeColor}>{bs.name}</Badge>
                    ))}
                  </Col>
                  <Col className="mb-6" style={{marginTop:"10px"}}>

                   {profile.socmedStats.map((soc) => (
                    <Row key={soc.id}>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="https://www.youtube.com/user/natefiggs"><img src={soc.socMed.avatarFullPath} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">{soc.totalFollower} followers</span></div>
                      </Col>
                    </Row>
                    ))}
                    <Row>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="#"><img src={shop} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">My Shop</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-12 border-top" style={{padding:"10px"}}>{profile.description} </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="mb-2">
            <UserStats />
          </Col>
        </Row>
        <Row>
        <Col lg="12" className="mb-2">
            <AccountProjects accountId={this.props.accountId}/>
          </Col>
        </Row>
      </div>
    );
  }
}


// Map Redux state to component props
function mapStateToProps(state) {
  return {
      accountId : state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(UserDetails);