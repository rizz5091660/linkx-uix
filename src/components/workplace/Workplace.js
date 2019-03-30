import React from "react";
import { HashRouter as Router, Route, Link, NavLink,withRouter } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button
} from "shards-react";

class Workplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            explores: []
        }
        this.goToProject = this.goToProject.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/config/explore").then((Response) => Response.json())
            .then((findresponse) => { this.setState({ explores: findresponse }) })
    }

    goToProject(url){
        this.props.history.push({
            pathname: url,
            state: { accountId: this.props.accountId }
          })
    }
    render() {
        return (
            <div style={{ paddingBottom: "1.5rem" }}>
                <Card small>
                    <CardHeader className="border-bottom"><b>Explore</b> </CardHeader>
                    <CardBody>
                        {this.state.explores.map((exp) => (
                            <Row className="p-1" key={exp.id}>
                                <Col>  <div style={{cursor:"pointer"}} onClick={this.goToProject.bind(this,exp.link)}><img src={exp.avatar} width="25" /><span className="p-2">{exp.label}</span></div></Col>
                            </Row>
                        ))}
                    </CardBody>
                </Card>
            </div>
        );
    }
}
export default withRouter(Workplace);