import React from "react";
import offericon from "../../assets/images/icon/hot-sale.png"
import AccountProjects from "../offer/AccountProjects";
import UserStats from "./Stats";
import { connect } from 'react-redux'
import { Row, Col, Card, CardBody, Badge } from "shards-react";
import ProfileModal from "./OverviewModal";
import {UserService} from "../../services/User.service"; 
import UploadImageModal from "./UploadImageModal";


class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        states: {value:{}},
        country:{value:{}},
        socmedStats: [{ socMed: {} }],
        brandSpecs: [{}],
        fName: null,
        lName: null,
        postalCode: null,
        
      },
    }
    this.editProfileChild = React.createRef();
    this.uploadProfileChild = React.createRef();
    this.showEditModal = this.showEditModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCtryDDChange = this.handleCtryDDChange.bind(this);
    this.handleStatesDDChange = this.handleStatesDDChange.bind(this);

    this.handleTagsDelete = this.handleTagsDelete.bind(this);
    this.handleTagsAddition = this.handleTagsAddition.bind(this);
    this.handleTagsDrag = this.handleTagsDrag.bind(this);
  }

  showEditModal(){
    this.editProfileChild.current.showModal();
  }

  showUploadModal(type){
    console.log(type);
    this.uploadProfileChild.current.showModal();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let profile = Object.assign({}, this.state.profile);     
    if(name==='fName'){
      profile.fName = value;
    }
    else if(name==='lName'){
      profile.lName = value;
    }
    else if(name==='summary'){
      profile.summary = value;
    }
    else if(name==='description'){
      profile.description = value;
    }
    
    else if(name==='postalCode'){
      profile.postalCode = value;
    }
    this.setState({profile});
}

handleCtryDDChange(event){
  let profile = Object.assign({}, this.state.profile); 
  profile.country.id = event.value;
  profile.country.value = event;
  profile.country.name = event.label;
  profile.states.value = null;
  this.setState({profile});  
}

handleStatesDDChange(event){
  let profile = Object.assign({}, this.state.profile); 
  profile.states.id = event.value;
  profile.states.value = event;
  profile.states.name = event.label;
  this.setState({profile});  
}

handleTagsDelete(i){
  let profile = Object.assign({}, this.state.profile);   
  profile.brandSpecs= profile.brandSpecs.filter((tag, index) => index !== i);
  this.setState({profile})
}

handleTagsAddition(tag) {
  console.log(tag);
  let profile = Object.assign({}, this.state.profile);   
  profile.brandSpecs.push(tag);
  this.setState({profile})
}

handleTagsDrag(tag, currPos, newPos) {
  const tags = [...this.state.tags];
  const newTags = tags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  // re-render
  this.setState({ tags: newTags });
}

  componentDidMount() {
    UserService.get(this.props.accountId).then((findresponse) => {
      this.setState({profile: findresponse })
      let profile = Object.assign({}, this.state.profile); 
      profile.country.value ={"value":this.state.profile.country.id,"label":this.state.profile.country.name};
      profile.states.value  ={"value":this.state.profile.states.id,"label":this.state.profile.states.name};
      this.setState({profile})
    }
    )
  }

  render() {
    const {
      profile,
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg="12" className="mb-2">
            <Card className="card-post card-post--1">
              <CardBody>
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${profile.profileBannerFullpath})` }}>
                  <div className="card-post__author d-flex" style={{cursor:"pointer"}} onClick={this.showUploadModal.bind(this,'profile-pict')}>
                    <a className="card-post__author-avatar"
                      style={{ backgroundImage: `url('${profile.avatarFullpath}')`, width: "7rem", height: "7rem" }}>
                    </a>
                  </div>
                </div>
                <Row style={{ marginTop: "15px"}}>
                  <Col >
                    <h4 className="mb-0">{profile.fName} {profile.lName}</h4>
                    <h6>{profile.summary}</h6>
                    <h6>{profile.address}, {profile.states.name} {profile.postalCode}, {profile.country.name}</h6>
                    {profile.brandSpecs.map((bs, idx) => (
                      <Badge key={idx} pill className={bs.badgeColor}>{bs.name}</Badge>
                    ))}
                  </Col>
                  <Col className="ml-4">
                    <div style={{ position: "absolute", right: "20px" }} onClick={this.showEditModal.bind(this)} >
                      <a><i className="material-icons mr-1" style={{ fontSize: "25px", cursor:"pointer" }}>edit</i></a>      
                    </div>
                    <div style={{color:"#FFF"}}>{" . "}</div>
                    {profile.socmedStats.map((soc,idx) => (
                      <Row key={idx}>
                        <Col lg="12">
                          <div style={{ display: "inline" }}><a href="https://www.youtube.com/user/natefiggs"><img src={soc.socMed.avatarFullPath} width="30" /></a> </div>
                          <div style={{ display: "inline" }}><span className="text-muted  mb-2">{soc.totalFollower} followers</span></div>
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col lg="12">
                        <div style={{ display: "inline" }}><a href="#"><img src={offericon} width="30" /></a> </div>
                        <div style={{ display: "inline" }}><span className="text-muted  mb-2">My Offer</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col><div className="border-top" style={{marginTop:"10px",marginBottom:"10px"}}></div>{profile.description} </Col>
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
            <AccountProjects accountId={this.props.accountId} />
          </Col>
        </Row>
            <ProfileModal ref={this.editProfileChild} profile ={profile} handleChange={this.handleChange} 
            handleCtryDDChange={this.handleCtryDDChange} handleStatesDDChange={this.handleStatesDDChange}  
            handleTagsDelete ={this.handleTagsDelete} handleTagsAddition ={this.handleTagsAddition} handleTagsDrag={this.handleTagsDrag}
            />
            <UploadImageModal ref={this.uploadProfileChild} accountId ={this.props.accountId}/>
      </div>
    );
  }
}


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    accountId: state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(UserDetails);