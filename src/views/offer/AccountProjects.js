import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "shards-react";
import { connect } from 'react-redux'
import EditAccountProjectModel from "./EditAccountProjectModel";
import { AccountProjectService } from '../../services/AccountProject.service';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [{socmed:{}}],
      projectsAll: [{}],
      title: "Projects",
      isToggleOn: true
    }
    this.editAccProjectChild = React.createRef();
    this.toggleShowProject = this.toggleShowProject.bind(this);
  }

  componentDidMount() {
    this.getAccountProjects();
  }

  getAccountProjects() {
    AccountProjectService.getAccountProjects(this.props.accountId).
    then((findresponse) => {
      let temp = null;
      if (findresponse != null && findresponse.length > 0) {
        temp = findresponse;
        if (findresponse.length > 3) {
          temp = findresponse.slice(0, 3);
        } else {
          temp = findresponse.slice(0, findresponse.length);
        }
      }
      this.setState({
        projectsAll: findresponse,
        projects: temp
      })
    }
    )
  }

  toggleShowProject() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
    if (this.state.isToggleOn) {
      this.setState({
        projects: this.state.projectsAll
      });
    } else if (!this.state.isToggleOn) {
      this.setState({
        projects: [],
        projects: (this.state.projectsAll.length > 3) ? this.state.projectsAll.slice(0, 3) : this.state.projectsAll.slice(0, this.state.projectsAll.length)
      });
    }
  }

  showEditModal() {
    this.editAccProjectChild.current.showEditModal();
  }

  
  addProjectSubmit(url, value, startDate, jobDesc,jobTitle) {
    AccountProjectService.add(url, value, startDate, jobDesc, jobTitle,"398765f0-4220-11e9-8972-aca63e449b3c");
    //.then((response) => {this.getAccountProjects()});
  }

  render() {
    const {
      title,
      projects,
      isToggleOn
    } = this.state;
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
    const projectArr = projects || [];
    let shoWMoreButton = <div></div>;
    console.log("size arr "+projectArr.length );
   // if (projectArr.length > 3) {
      shoWMoreButton = <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            <Button theme="white" type="submit" onClick={this.toggleShowProject}>
              Show {isToggleOn ? " More" : "Less"}
            </Button>
          </Col>
        </Row>
      </CardFooter>;
   // }
    return (
      <Card>
        <CardBody className="p-0">
          <div style={{ position: "absolute", right: "20px", top: "20px" }} onClick={this.showEditModal.bind(this)} >
            <i className="material-icons mr-1" style={{ fontSize: "25px", cursor: "pointer" }}>add</i>
          </div>
          <div className="headline p-4">{title}</div>
          {projectArr.map((prj, idx) => (
            <Row key={idx} className="p-4">
              <Col md="12">
                <Row>
                  <Col>
                    <div className="blog-comments__avatar mr-3" style={{ float: "left" }}>
                      <img src={prj.avatar} alt={prj.clientName} />
                    </div>
                    <div style={{ float: "left" }}>                      
                      <span className="my-1 mb-2" style={{ fontWeight: "500",fontSize:"16px" }}>{prj.jobTitle}</span><br/>
                      <span><a className="text-secondary" href="#">{prj.clientName}</a>{". "}</span>
                      <span className="text-muted">{(new Date(prj.startDate)).toLocaleDateString('en-US', DATE_OPTIONS)} </span>                      
                      <ButtonGroup size="sm">
                          <Button theme="white" className="mx-3" style={{padding:"2px 2px"}}><span className="text-success"> <i className="material-icons">check</i> </span>{" "}Details</Button>
                        </ButtonGroup>
                     </div> 
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                  <div style={{ float: "left" }}>
                    <img src={prj.thumbnail}  height="90px" />
                    </div>
                    <div className="projectStats" style={{ height: "90px", backgroundColor: "#f2f3f5", padding: "5px",float: "left"  }}>
                    <img src={prj.socmed.avatarFullPath} width="50px" /><br/>
                      <span><a style={{ color: "#868e96", fontWeight: "400", fontSize: "13px" }} href={prj.url} target="new" >{prj.projectTitle}</a></span><br />
                      <span style={{ fontWeight: "200", fontSize: "12px", marginRight: "5px" }}><i className="material-icons mr-1">play_circle_filled</i>  : {prj.nView}</span>
                      <span style={{ fontWeight: "200", fontSize: "12px", margin: "0 5px" }}><i className="material-icons mr-1">thumb_up</i>  : {prj.nLike}</span>
                      <span style={{ fontWeight: "200", fontSize: "12px", margin: "0 5px" }}><i className="material-icons mr-1">thumb_down</i> : {prj.nDislike}</span>
                      <span style={{ fontWeight: "200", fontSize: "12px", margin: "0 5px" }}><i className="material-icons mr-1">comment</i> : {prj.nComment}</span>
                    </div>
                  </Col>
            
                </Row>
              </Col>
            </Row>
          ))}
          <EditAccountProjectModel ref={this.editAccProjectChild} addProjectSubmit={this.addProjectSubmit} />
        </CardBody>
        {shoWMoreButton}
      </Card>
    )
  };
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    accountId: state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(Projects)