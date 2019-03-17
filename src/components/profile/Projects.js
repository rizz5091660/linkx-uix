import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "shards-react";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects:[{}],
      title: "Projects",
      cloudinary:"https://res.cloudinary.com/dw2ssncv1/image/upload/v1551484135/",
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/project/account/398765f0-4220-11e9-8972-aca63e449b3c").then((Response) => Response.json()).then((findresponse)=> {
      this.setState({
        projects: findresponse
            })
        }
    )
}

  render() {
    const {
      cloudinary,
      title,
      projects
    } = this.state;
    console.log(projects);
  return(
<Card>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      {projects.map((prj) => (
        <div key={prj.id} className="blog-comments__item d-flex p-3">
          {/* Avatar */}
          <div className="blog-comments__avatar mr-3">
            <img src={cloudinary+prj.avatar} alt={prj.clientName} />
          </div>

          {/* Content */}
          <div className="blog-comments__content">
            {/* Content :: Title */}
            <div className="blog-comments__meta text-mutes">
              <a className="text-secondary" href="#">
                {prj.clientName}
              </a>{" "}
              <span className="text-mutes">- {prj.startDate}</span>
            </div>

            {/* Content :: Body */}
            <p className="m-0 my-1 mb-2 text-muted">{prj.jobDesc}</p>

            {/* Content :: Actions */}
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

    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit">
            View All Projects
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
  )};
}
export default Projects;