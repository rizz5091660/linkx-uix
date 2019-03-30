import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Form,
    FormInput,
    FormFeedback,
    Button,
    Alert
} from "shards-react";

import ProjectCriteria from "../components/search-criteria/ProjectCriteria"
import ProjectListSummary from "../components/search-list-summary/ProjectListSummary"
import ProjectDetail from "../components/search-item-detail/ProjectDetail";


class SearchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            project: {},
            modalShowApplied: false
        }
        this.getProjectDetail = this.getProjectDetail.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
        this.searchProject()
    }

    searchProject() {
        fetch("http://localhost:8080/api/project").then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                projects: findresponse
            })
            this.getProjectDetail(this.state.projects[0].id);
        }
        )
    }

    getProjectDetail(projectId) {
        fetch("http://localhost:8080/api/project/" + projectId).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                project: findresponse
            })
        }
        )
    }

    showAlert(isShow){
        this.setState({ modalShowApplied:isShow});
    }


    render() {
        const {
            projects,
            project,
            modalShowApplied
        } = this.state;
        let alert= (modalShowApplied)? <Alert className="mb-0"> <i className="material-icons mr-1" style={{fontSize:"25px",fontWeight: "bold"}}>done</i><span>Your Application Has Been Submitted</span></Alert>:<div></div>;
       console.log("alert "+modalShowApplied);
        return (
            <Container fluid className="main-content-container">
                <Row>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Card>
                            <CardBody style={{ padding: "1rem" }}>
                                <Form>
                                    <Row form>
                                        <Col md="12" style={{ display: "flex", flexDirection: "row", textAlign: "center", padding: "0 15%" }}>
                                            <FormInput placeholder="Enter Keywords" required onChange={() => { }} style={{ flexGrow: "2", marginRight: "10px", flexBasis: "33%" }} />
                                            <FormInput placeholder="Any Classification" required onChange={() => { }} style={{ flexGrow: "2", marginRight: "10px", flexBasis: "33%" }} />
                                            <FormInput placeholder="Location" required onChange={() => { }} style={{ flexGrow: "2", marginRight: "10px", flexBasis: "33%" }} />
                                            <Button theme="primary" className="mb-2 mr-1">Search</Button>
                                        </Col>
                                    </Row>
                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row >
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                       {alert}
                    </Col>
                </Row>
                <div className="centerPosition">
                    <Row className="py-4">
                        <Col md="4">
                            <ProjectListSummary projects={projects} getProjectDetail={this.getProjectDetail} showAlert={this.showAlert}  />
                        </Col>
                        <Col md="7">
                            <ProjectDetail project={project} accountId={this.props.location.state.accountId} showAlert={this.showAlert} />
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }

}
export default SearchProject;