import React from "react";
import shop from "../../images/icon/online-store.png"
import Projects from "./Projects";
import UserStats from "./UserStats";

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
        socmeds:[{socialMedia:{},socMedStats:{}}],
        brandSpecs:[{brandSpec:{}}]
      },
      cloudinary:"https://res.cloudinary.com/dw2ssncv1/image/upload/v1551484135/"
      ,
      userDetails: {
        name: "Nathan Figueroa",
        backgroundImage: require("./../../images/content-management/channels4_banner.jpg"),
        avatar: require("./../../images/avatars/nathanfigueroa.jpg"),
        jobTitle: "421,420 subscribers",
        jobTitle2: "1,011 followers",
        jobTitle3: "3,656 followers",
        performanceReportTitle: "Workload",
        performanceReportValue: 74,
        metaTitle: "Description",
        metaValue:
          "Looking forward for food projects!!🍕🍔🌯 "
      }
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/account/398765f0-4220-11e9-8972-aca63e449b3c").then((Response) => Response.json()).then((findresponse)=> {
      this.setState({
        profile: findresponse
            })
        }
    )
}

  render() {
    const {
      profile,
      userDetails,
      cloudinary
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg="12" className="mb-2">
            <Card className="card-post card-post--1">
              <CardBody>
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${userDetails.backgroundImage})` }} >

                <div className="card-post__author d-flex">
                  <a
                    href="#"
                    className="card-post__author-avatar" 
                    style={{ backgroundImage: `url('${userDetails.avatar}')`,width:"5rem",height:"5rem" }}>
                  </a>
                </div>
              </div>
                <Row style={{padding:"10px"}}>
                  <Col className="mb-6" style={{marginTop:"25px"}}>
                    <h4 className="mb-0">{profile.fName} {profile.lName}</h4>
                    <h6>{profile.summary}</h6>
                    <h6>{profile.address}, {profile.states.name} {profile.postalCode}</h6>
                    {profile.brandSpecs.map((bs) => (
                      <Badge pill className={bs.brandSpec.badgeColor}>{bs.brandSpec.name}</Badge>
                    ))}
                  </Col>
                  <Col className="mb-6" style={{marginTop:"10px"}}>

                   {profile.socmeds.map((soc) => (
                    <Row key={soc.id}>
                      <Col className="ml-4" lg="12">
                        <div style={{display:"inline"}}><a href="https://www.youtube.com/user/natefiggs"><img src={cloudinary + soc.socialMedia.avatar} width="30"/></a> </div>
                        <div style={{display:"inline"}}><span className="text-muted  mb-2">{soc.socMedStats.totalFollower} followers</span></div>
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
                  <Col className="mb-12 border-top" style={{padding:"10px"}} >
                     Looking forward for food projects!!🍕🍔🌯 
                  </Col>
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
            <Projects />
          </Col>
        </Row>
      </div>
    );
  }
}
export default UserDetails;