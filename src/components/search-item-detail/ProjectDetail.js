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
    Button,
    Badge
} from "shards-react";
import { Modal } from 'react-bootstrap';


class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShowApplying: false,
            projectName:'',
            orgName:'',
            projectId:''
        }
    }

    applyProject(){
        fetch('http://localhost:8080/api/projectacc', {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({prjId:this.state.projectId, accId:this.props.accountId})
        }).then((res) => res.json())
        .then((data) => { 
            console.log(data);
            this.setState({
                modalShowApplying:false,
            });
            this.props.showAlert(true);
        })
        .catch((err)=>console.log(err))
    }


    openApplyProjectModal(pPrjId,pProjectName,pOrgName) {
        this.setState({
            modalShowApplying: true,
            projectName : pProjectName,
            orgName : pOrgName,
            projectId:pPrjId
        });
        this.props.showAlert(false);
    }


    render() {
        const prj = this.props.project;
        const {
            modalShowApplying,
            projectName,
            orgName,
            projectId
        } = this.state;
        let modalCloseApplying = () => this.setState({ modalShowApplying: false });  
        const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <div className="border-bottom" style={{ padding: "1rem" }} >
                                <div className="card-post__author-avatar card-post__author-avatar--small" style={{ backgroundImage: `url('${prj.organizationAvatar}')` }}></div>
                                <div style={{ float: "left" }}>
                                    <div className="feed profile-name-feed">
                                        <span style={{ fontSize: "18px" }}> {prj.name}</span><br />
                                        <b> {prj.organizationName}</b><br />
                                        <span className="text-muted">{(new Date(prj.startDate)).toLocaleDateString('en-US', DATE_OPTIONS)} </span> {" - "}
                                        <span className="text-muted">{(new Date(prj.endDate)).toLocaleDateString('en-US', DATE_OPTIONS)} </span>
                                        <span>{" at"} {prj.cityName},{prj.statesName},{prj.countryName} </span>
                                    </div>
                                </div>
                                <div style={{ position: "absolute", right: "50px", top: "15px" }}>
                                    <Button theme="primary" className="mb-2 mr-1" onClick={this.openApplyProjectModal.bind(this,prj.id,prj.name,prj.organizationName)}>Apply</Button>
                                </div>

                                <div style={{ paddingleft: "10rem", paddingTop: "4rem" }}> <span style={{ fontSize: "20px" }} >Project Description</span></div>
                                <div style={{ wordWrap: "break-word", paddingleft: "10rem", paddingTop: "1rem" }}><span className="text-muted"> {prj.description} </span></div>
                            </div>
                        </Col>
                        <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={modalShowApplying} onHide={modalCloseApplying}>
                            <Modal.Header closeButton className="p-3">
                                Apply as {projectName} at {orgName}
                            </Modal.Header>
                            <Modal.Body style={{ padding: "0rem" }}>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button theme="primary" className="mb-2 mr-1" onClick={this.applyProject.bind(this)}>Submit</Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}
export default ProjectDetail;