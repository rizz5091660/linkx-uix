
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

class ProjectListSummary extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card>
                <CardBody>                    
                {this.props.projects.map((prj, idx) => (
                    <Row key={idx}>
                        <Col>
                        <div className="border-bottom" style={{ padding: "1rem" }} >                   
                            <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${prj.organizationAvatar}')` }}></div>
                            <div className="feed profile-name-feed">
                             <span style={{fontSize:"18px"}}> {prj.name}</span><br/>  <b> {prj.organizationName}</b>
                            </div>
                            <div style={{ wordWrap: "break-word",paddingleft:"10rem", paddingTop:"1rem"}}><span className="text-muted"> {prj.description} </span></div>
                    </div>
                        </Col>
                    </Row>
                    ))}
                </CardBody>
            </Card>
        );
    }

}
export default ProjectListSummary;