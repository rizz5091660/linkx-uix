import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormInput,
    Button,
    Alert
} from "shards-react";
import Pagination from 'react-bootstrap/Pagination';
import ProjectListSummary from "../components/search-list-summary/ProjectListSummary";
import ProjectDetail from "../components/search-item-detail/ProjectDetail";
import {ProjectService} from "../services/Project.service"; 
import {connect} from 'react-redux'

class SearchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: { projects: [], totalRecord: 0 },
            project: {},
            modalShowApplied: false,
            activePage: 1,
            totalPage: 5
        }
        this.getProjectDetail = this.getProjectDetail.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
        this.searchProject(1)
    }

    searchProject(offset) {
        ProjectService.searchProject(offset)
        .then((result) => {
            this.setState({ searchResult: result, activePage: offset})
            this.getProjectDetail(this.state.searchResult.projects[0].id);
        })
    }

    getProjectDetail(projectId) {
        ProjectService.getProjectDetail(projectId)
        .then((result) => { this.setState({ project: result})})
    }

    showAlert(isShow) {
        this.setState({ modalShowApplied: isShow });
    }

    handlePageChange(pageNumber) {
        this.searchProject(pageNumber);
    }

    render() {
        const {
            searchResult,
            project,
            modalShowApplied,
            activePage,
        } = this.state;
        let alert = (modalShowApplied) ? <Alert className="mb-0"> <i className="material-icons mr-1" style={{ fontSize: "25px", fontWeight: "bold" }}>done</i><span>Your Application Has Been Submitted</span></Alert> : <div></div>;
        let items = [];
        let totalNpage = Math.ceil(searchResult.totalRecord / 10);
        for (let number = 1; number <= totalNpage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === activePage} onClick={this.handlePageChange.bind(this, number)}>{number}</Pagination.Item>,
            );
        }
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
                        <Col md="5" style={{ padding: "0 2px" }}>
                            <ProjectListSummary projects={searchResult.projects} getProjectDetail={this.getProjectDetail} showAlert={this.showAlert} />
                            <div style={{marginTop:"1rem"}}> <Pagination>{items}</Pagination> </div>
                        </Col>
                        <Col md="7" style={{ padding: "0 2px" }}>
                            <ProjectDetail project={project} accountId={this.props.accountId} showAlert={this.showAlert} />
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}
// Map Redux state to component props
function mapStateToProps(state) {
    return {
        accountId : state.LinkxReducer.accountId
    }
  }
  
export default connect(mapStateToProps)(SearchProject)