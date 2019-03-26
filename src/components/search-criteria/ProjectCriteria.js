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



class ProjectCriteria extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
        );

    }

}
export default ProjectCriteria;