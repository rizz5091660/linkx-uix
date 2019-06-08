import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Badge,
    Button,
    CardFooter
} from "shards-react";
class ListSummary extends React.Component {
    getProjectDetail(id) {
        this.props.getProjectDetail(id);
        this.props.showAlert(false);
    }
    render() {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", backgroundColor: "#FFFF" }}>
                {this.props.accounts.map((acc, idx) => (
                    <Card className="scroll" style={{ width: "250px", minHeight: "250px", margin: "10px 10px " }}>
                        <CardBody>
                            <Form>
                                <Row key={idx}>
                                    <Col>
                                        <div onClick={this.getProjectDetail.bind(this, acc.id)}>
                                            <div style={{ textAlign: "center" }} >
                                                <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${acc.avatarFullpath}')` }}></div>
                                                <div className="feed profile-name-feed" style={{ top: "5px" }}>
                                                    <span style={{ fontSize: "15px" }}> {acc.fName + " " + acc.lName}</span>
                                                </div>
                                                <div><span> {acc.skill.name} </span> </div>
                                                <div> {acc.organizationName!=null && <span> at {acc.organizationName} </span> }  </div>
                                                {acc.states != null && acc.country != null &&
                                                    <div>
                                                        <span>
                                                            {acc.states.name},{acc.country.name}
                                                        </span>
                                                    </div>
                                                }
                                            </div>
                                            <div style={{ paddingTop: "15px", textAlign: "center" }}>
                                                {acc.brandSpecs != null && acc.brandSpecs.map((bs, idx) => (
                                                    <Badge pill className={`card-post__category ${bs.badgeColor}`}>{bs.name}</Badge>
                                                ))
                                                }
                                            </div>
                                            {acc.socmedStats != null && acc.socmedStats.map((ss, idx) => (
                                                <div style={{ paddingTop: "15px" }}>
                                                    {ss.socMed != null &&
                                                        <div>
                                                            <div style={{ display: "inline" }}> <img src={ss.socMed.avatarFullPath} width="30" /></div>
                                                            <div style={{ display: "inline" }}> {ss.totalFollower} </div>
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                        <CardFooter className="border-top" style={{textAlign:"center",padding:"10px 0"}}>
                                {acc.friendFlag  && <Button size="sm" theme="primary" className="mb-2 mr-1 btn-outline-primary" style={{width:"70%"}}>Message </Button> }
                                {!acc.friendFlag  &&  <Button size="sm" theme="primary" className="mb-2 mr-1 btn-outline-primary" style={{width:"70%"}}>Connect </Button> }
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    }
}
export default ListSummary;