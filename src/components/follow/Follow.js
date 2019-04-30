import React from "react";
import UserAudience from "../audience/UserAudience";
import { connect } from 'react-redux'
import {
    Card,
    CardHeader,
    CardBody, 
    Button,
    Row,
    Col,
} from "shards-react";
import {FollowService }from '../../services/Follow.service';

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            suggestion:[],
            follows:[]
        }
        this.followSuggestion=this.followSuggestion.bind(this);
    }

    followSuggestion(event,accountFollowId){
        event.preventDefault();
        FollowService.followAccount(this.props.accountId,accountFollowId)
        .then(response => {console.log(response)} );
    }

    componentDidMount() {
        FollowService.accountSimilarTag(this.props.accountId)
        .then((findresponse)=> {
          this.setState({
                suggestion: findresponse
                })
            }
        )
        FollowService.organizationSimilarTag(this.props.accountId)
        .then((findresponse)=> {
          this.setState({
            follows: findresponse
                })
            }
        )       
    }

    render() {
        const {
            follows,
            suggestion
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
                <CardBody>
                <div className="headline">{headerTitle}</div>
                {follows.map((follow, idx) => (
                    <Row key={idx}>
                        <Col style={{paddingTop:"10px",paddingRight:"0px"}}>
                            <div style={{float:"left"}}>
                                <img
                                    className="user-avatar rounded-circle mr-2"
                                    src={follow.avatar}
                                    alt={follow.name}
                                    width="50"
                                />
                            </div>
                        <div style={{float:"left",width:"50%"}}>
                            <b>{follow.name}</b><br/> <span style={{"fontWeight":"300"}}>{follow.title}</span>
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
                     <img  className="user-avatar rounded-circle mr-2" src="https://s3.amazonaws.com/linkz-us-east-1554525925157/profile-pict/nathanfigueroa.jpg" width="50"/> {"      "}
                     <img  className="user-avatar rounded-circle mr-2" src="https://s3.amazonaws.com/linkz-us-east-1554525925157/company-logo/mcdonald.png" width="50"/>
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
            {suggestion.map((sgs, idx) => (
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
                        <button className="btn btn-outline-primary btn-sm btn-pill" onClick={e => this.followSuggestion(e,sgs.id)}><i className="material-icons mr-1">person_add</i> Follow</button>
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

// Map Redux state to component props
function mapStateToProps(state) {
    return {
      accountId: state.LinkxReducer.accountId
    }
  }

export default connect(mapStateToProps)(Follow);  
  

