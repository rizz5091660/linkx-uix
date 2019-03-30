import React from "react";
import { Modal, Button} from 'react-bootstrap'; 
import {
  Row,
  Col,
} from "shards-react";

class ShowLikes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

    render() {
      return (
        <Modal {...this.props} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
          <Modal.Header closeButton className="p-3">
            <Modal.Title id="contained-modal-title-vcenter"> {this.props.likes.length} Likes </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding: "0rem"}}>
          {this.props.likes.map((like,idx) => (
                <Row key={idx} className="p-3 border-bottom">
                    <Col className="mb-12" style={{paddingTop:"10px"}}>
                        <div style={{float:"left"}}>
                            <img className="user-avatar rounded-circle mr-2" src={like.avatar} width="50"/>
                        </div>
                    <div style={{float:"left",width:"45%"}}>
                        <b>{like.name}</b><br/> <span style={{"fontWeight":"300"}}>{like.position} at Strictly Dumpling</span>
                    </div>
                    <div style={{float:"right"}}>
                        <button className="mb-2 btn btn-outline-primary btn-sm btn-pill"><i className="material-icons mr-1">person_add</i> Follow</button>
                    </div>
                    </Col>
                </Row>
          ))}
          </Modal.Body>
        </Modal>
      );
    }
  }

  export default ShowLikes;