import React from "react";
import mcdonald from "../../images/icon/mcdonald.png";
import avatar from "../../images/avatars/nathanfigueroa.jpg";
import UserAudience from "../audience/UserAudience";

import {
    Card,
    CardHeader,
    CardBody, 
    Button,
    Row,
    Col,
} from "shards-react";

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            suggesions:[],
            follows:[]
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/account/398765f0-4220-11e9-8972-aca63e449b3c/similar").then((Response) => Response.json()).then((findresponse)=> {
          this.setState({
                 suggesions: findresponse
                })
            }
        )
        fetch("http://www.mocky.io/v2/5c79c5d84900005400a5a64b").then((Response) => Response.json()).then((findresponse)=> {
            this.setState({
                   follows: findresponse
                  })
              }
          )        
    }

    render() {
        const {
            follows,
            suggesions
        } = this.state;
        let card0;
        let card1;
        let headerTitle;
        let card2;
        let audience;

        if(this.props.type=='feed'){
            headerTitle = "Add to your feed ";
            card1 =
            <Card>
                <CardHeader className="border-bottom"><b>{headerTitle}  </b> </CardHeader>
                <CardBody>
                {follows.map((post, idx) => (
                    <Row key={idx}>
                        <Col style={{paddingTop:"10px",paddingRight:"0px"}}>
                            <div style={{float:"left"}}>
                                <img
                                    className="user-avatar rounded-circle mr-2"
                                    src={post.authorAvatar}
                                    alt={post.name}
                                    width="50"
                                />
                            </div>
                        <div style={{float:"left",width:"50%"}}>
                            <b>{post.name}</b><br/> <span style={{"fontWeight":"300"}}>{post.title}</span>
                        </div>
                        <div style={{float:"left"}}>
                            <Button size="sm" theme="primary" className="mb-2 mr-1 btn-outline-primary">Follow </Button>    
                        </div>
                        </Col>
                    </Row>
            ))}
                <a href="#"><b>View all recommendations</b></a>
            </CardBody>
        </Card>;
       
        card2 = <Card className="mb-4 pt-3">
        <div></div>
        <CardBody> 
            <Row>
                <Col className="mb-12 text-center mb-4">
                     <img  className="user-avatar rounded-circle mr-2" src={avatar} width="50"/> {"      "}
                     <img  className="user-avatar rounded-circle mr-2" src={mcdonald} width="50"/>
                 </Col>
            </Row>
            <Row>
                <Col className="mb-12 text-center mb-4">
                    <span>Nathan Figueroa, explore amazing projects with McDonald's</span>
                </Col>
            </Row>   
            <Row>
                <Col className="mb-12 text-center">
                     <Button size="sm" theme="primary" className="mb-2 mr-1">Follow </Button>
                </Col>
            </Row>   
        </CardBody>
    </Card>;
    }

    else if(this.props.type=='userdetail'){
        headerTitle = "People Also Viewed";
        card1 =
        <Card>
            <CardBody>
            <div className="headline">{headerTitle}</div>
            {suggesions.map((sgs, idx) => (
                <Row key={idx}>
                    <Col className="mb-12" style={{paddingTop:"10px"}}>
                        <div style={{float:"left"}}>
                            <img className="user-avatar rounded-circle mr-2"
                                src={sgs.avatar}
                                alt={sgs.name}
                                width="50"
                            />
                        </div>
                    <div style={{float:"left",width:"45%"}}>
                        <b>{sgs.name}</b><br/> <span style={{"fontWeight":"300"}}>{sgs.title} at {sgs.organization}</span>
                    </div>
                    <div style={{float:"left"}}>
                        <button className="mb-2 btn btn-outline-primary btn-sm btn-pill"><i className="material-icons mr-1">person_add</i> Follow</button>
                    </div>
                    </Col>
                </Row>
        ))}
            <a href="#"><b>View all recommendations</b></a>
        </CardBody>
         </Card>;
            audience=<div><UserAudience/> </div>            
}
        return (
           <div className="suggestionDisplay">{card0}{card1}{card2}{audience}</div>
        );
    }
}
export default Follow;
