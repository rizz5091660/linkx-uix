import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter
} from "shards-react";

import ProjectCriteria from "../components/search-criteria/ProjectCriteria"

class SearchProject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid className="main-content-container">
                <Row>
                    <Col style={{paddingLeft:0,paddingRight:0}}>
                        <ProjectCriteria/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="3">
                    </Col>
                    <Col lg="5">
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default SearchProject;