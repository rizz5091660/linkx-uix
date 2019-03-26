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
    Button
} from "shards-react";

import ProjectCriteria from "../components/search-criteria/ProjectCriteria"
import ProjectListSummary from "../components/search-list-summary/ProjectListSummary"

class SearchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects : []
        }
    }

    componentDidMount() {
       this.searchProject()
    }

    searchProject(){
        fetch("http://localhost:8080/api/project").then((Response) => Response.json()).then((findresponse)=> {
            this.setState({
                   projects: findresponse
                  })
              }
          )
    }

    render() {
        const {
            projects
        } = this.state;
        return (
            <Container fluid className="main-content-container">
                <Row>
                    <Col style={{paddingLeft:0,paddingRight:0}}>
                    <Card>
                <CardBody style={{padding: "1rem"}}>
                    <Form>
                        <Row form>
                            <Col md="12" style={{ display: "flex", flexDirection: "row",textAlign:"center", padding:"0 15%"}}>
                                <FormInput  placeholder="Enter Keywords" required  onChange={() => { }}  style={{flexGrow: "2",marginRight: "10px",flexBasis: "33%"}} />       
                                <FormInput  placeholder="Any Classification" required  onChange={() => { }} style={{flexGrow: "2",marginRight: "10px",flexBasis: "33%"}} />                          
                                <FormInput  placeholder="Location" required  onChange={() => { }} style={{flexGrow: "2",marginRight: "10px",flexBasis: "33%"}} />
                                <Button theme="primary" className="mb-2 mr-1">Search</Button>
                            </Col>
                        </Row>
                    </Form>

                </CardBody>
            </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="5">
                    <ProjectListSummary projects ={projects}/>
                    </Col>
                    <Col lg="7">
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default SearchProject;