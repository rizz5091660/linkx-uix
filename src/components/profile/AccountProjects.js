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
import {connect} from 'react-redux'

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects:[{}],
      projectsAll:[{}],
      title: "Projects",
      isToggleOn: true
    }
     // This binding is necessary to make `this` work in the callback
     this.toggleShowProject = this.toggleShowProject.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/accproject/account/"+this.props.accountId).then((Response) => Response.json()).then((findresponse)=> {
      let temp = null;
      if(findresponse!=null && findresponse.length > 0){
        if(findresponse.length>3){
          temp = findresponse.slice(0,3);
        }else{
          temp = findresponse.slice(0,findresponse.length);
        }
      }
      this.setState({
        projectsAll: findresponse,
        projects : temp
          })
      }
    )
}

  toggleShowProject(){
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
    if(this.state.isToggleOn){
      this.setState({
        projects:this.state.projectsAll
      });
    }else if(!this.state.isToggleOn){
      this.setState({
        projects:[],
        projects: (this.state.projectsAll.length>3)? this.state.projectsAll.slice(0,3): this.state.projectsAll.slice(0,this.state.projectsAll.length)
      });
    }
  } 

  render() {
    const {
      title,
      projects,
      isToggleOn
    } = this.state;
    const DATE_OPTIONS = { year: 'numeric', month: 'short' };
    const projectArr = projects || [] ;
    const shoWMoreButton = <div></div>;
    if(projectArr > 3){
      shoWMoreButton = <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit" onClick={this.toggleShowProject}>
          Show {isToggleOn?" More":"Less" }
          </Button>
        </Col>
      </Row>
    </CardFooter>;
    }
  return(
<Card>
    <CardBody className="p-0">
    <div className="headline p-4">{title}</div>
      {projectArr.map((prj) => (
        <div key={prj.id} className="blog-comments__item d-flex p-4">
          <div className="blog-comments__avatar mr-3">
            <img src={prj.avatar} alt={prj.clientName} />
          </div>
          <div className="blog-comments__content">
            <div className="blog-comments__meta text-mutes">
              <a className="text-secondary" href="#">
                {prj.clientName}
              </a>{", "}
              <span className="text-mutes">{(new Date(prj.startDate)).toLocaleDateString('en-US', DATE_OPTIONS)} </span>
            </div>
            <p className="m-0 my-1 mb-2 text-muted">{prj.jobDesc}</p>
            <div className="blog-comments__actions">
              <ButtonGroup size="sm">
                <Button theme="white">
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                  Details
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ))}
    </CardBody>
      {shoWMoreButton}
  </Card>
  )};
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
      accountId : state.LinkxReducer.accountId
  }
}

export default connect(mapStateToProps)(Projects)