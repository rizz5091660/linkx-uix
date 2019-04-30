import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
} from "shards-react";
class ProjectListSummary extends React.Component {
    getProjectDetail(id) {
        this.props.getProjectDetail(id);
        this.props.showAlert(false);
    }
    render() {
        return (
            <Card className="scroll">
                <CardBody>
                    <Form>
                        {this.props.projects.map((prj, idx) => (
                            <Row key={idx}>
                                <Col>
                                    <div className="border-bottom" style={{ padding: "1rem", cursor: "pointer" }} onClick={this.getProjectDetail.bind(this, prj.id)}>
                                        <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${prj.organizationAvatar}')` }}></div>
                                        <div className="feed profile-name-feed">
                                            <span style={{ fontSize: "18px" }}> {prj.name}</span><br />  <b> {prj.organizationName}</b>
                                        </div>
                                        <div style={{ wordWrap: "break-word", paddingleft: "10rem", paddingTop: "1rem" }}><span className="text-muted"><span dangerouslySetInnerHTML={{__html:prj.description}}></span> </span></div>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </Form>
                </CardBody>
            </Card>
        );
    }
}
export default ProjectListSummary;