import React from "react";
import { Modal } from 'react-bootstrap';
import { Row, Col, FormInput, Button, } from "shards-react";
import { UploadService } from '../../services/Upload.service';

class UploadImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            data: new FormData(),
            sourceType: 'profile-pict',
            file :null
        }
    }
    showModal() {
        this.setState({ modalOpen: true });
    }
    submitImage(event) {
        event.preventDefault();
        this.setState({ modalOpen: false });
        UploadService.upload(this.state.data);
    }

    handleUploadFile = (event) => {
        let data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('sourceType', this.state.sourceType);
        data.append('accountId', this.props.accountId);
        this.setState({ data: data,
            file: URL.createObjectURL(event.target.files[0]) });
        //calling async Promise and handling response or error situation
        /*
        this.fileService.uploadFileToServer(data).then((response) => {
            console.log("File " + file.name + " is uploaded");
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                //HTTP error happened
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
                //some other error happened
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
        */
    };

    render() {
        const { modalOpen, file } = this.state;
        let modalClose = () => this.setState({ modalOpen: false });
        return (
            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={modalOpen} onHide={modalClose}>
                <form id="uploadImageForm" encType="multipart/form-data" onSubmit={this.submitImage.bind(this)}>
                    <Modal.Header closeButton className="p-3">Edit your Photo</Modal.Header>
                    <Modal.Body>
                        <Row form>
                            <Col md="12">
                            <img src={file} width="400px"/>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="6">
                                <input type="file" name="file" onChange={this.handleUploadFile} />
                            </Col>
                            <Col md="6">
                                <Button theme="primary" className="mb-2 mr-1" type="submit">Save Photo</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </form>
            </Modal>

        );
    }
}
export default UploadImageModal;