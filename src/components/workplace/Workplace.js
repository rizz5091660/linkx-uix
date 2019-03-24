import React from "react";
import creator from "../../images/icon/social-media.png";
import megaphone from "../../images/icon/megaphone.png";
import community from "../../images/icon/community.png";
import equipment from "../../images/icon/video-camera.png";
import mentor from "../../images/icon/presentation.png";
import crew from "../../images/icon/staff.png";

import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Container
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
                    <Row key={exp.id}>
                    <Col><a className="feed-hyperlink-action" href={exp.link}><img src={exp.avatar} width="25" /><span className="p-2">{exp.label}</span></a> </Col>
                    </Row>
                ))}
                </CardBody>
            </Card>
            </div>
        );
    }
}
export default Workplace;