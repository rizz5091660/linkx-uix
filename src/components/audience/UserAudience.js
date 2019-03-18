import React, { Component } from 'react';
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Progress,
  ListGroupItem
} from "shards-react";

export default class UserAudience extends Component {
  render() {
    return (
      <Card small className="blog-comments">
        <CardBody>
        <div className="headline">Audience Interest</div>
          <ListGroupItem className="px-3">           
            <div className=" p-3">
              <div style={{display:"inline-block",width:"80px"}}>Food </div> 50%
              <div><Progress theme="success" style={{ height: "5px" }} value={50} className="mb-3" /></div>
              <div style={{display:"inline-block",width:"80px"}}>Restaurant </div> 30%
              <div><Progress theme="success" style={{ height: "5px" }} value={40} className="mb-3" /></div>
              <div style={{display:"inline-block",width:"80px"}}>Others </div> 20%
              <div><Progress theme="success" style={{ height: "5px" }} value={40} className="mb-3" /></div>
            </div>

          </ListGroupItem>
        </CardBody>
      </Card>
    )
  }
}
