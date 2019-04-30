import React from "react";
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from "shards-react";

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            explores: []
        }
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/config/explore").then((Response) => Response.json())
            .then((findresponse) => { this.setState({ explores: findresponse }) })
    }
    
    render() {
        return (
            <div style={{ paddingBottom: "1.5rem" }}>
                <Card small>
                    <CardBody>
                    <div className="headline"><b>Explore</b></div>
                        {this.state.explores.map((exp) => (
                            <Row className="p-1" key={exp.id}>
                                <Col>  
                                <NavLink to={exp.link}>
                                     <div style={{cursor:"pointer"}}>
                                     <img src={exp.avatar} width="25" />
                                     <span className="p-2">{exp.label}
                                     </span></div>
                                </NavLink>
                                </Col>
                            </Row>
                        ))}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        accountId : state.LinkxReducer.accountId
    }
  }
  
export default connect(mapStateToProps)(Explore)