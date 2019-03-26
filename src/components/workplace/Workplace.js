import React from "react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from "shards-react";

class Workplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            explores:[]
        }
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/config/explore").then((Response) => Response.json())
          .then((findresponse) => { this.setState({ explores: findresponse }) })
      }
    render() {
        return (
            <div style={{paddingBottom:"1.5rem"}}>
            <Card small>
                <CardHeader className="border-bottom"><b>Explore</b> </CardHeader>
                <CardBody>
                {this.state.explores.map((exp) => (
                    <Row className="p-1" key={exp.id}>
                    <Col> <NavLink to={exp.link}><img src={exp.avatar} width="25" /><span className="p-2">{exp.label}</span></NavLink></Col>
                    </Row>
                ))}
                </CardBody>
            </Card>
            </div>
        );
    }
}
export default Workplace;