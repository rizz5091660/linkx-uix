import React from "react";
import { Container, Row, Col, Card, CardBody,Form,FormInput, Button, Alert } from "shards-react";
import Pagination from 'react-bootstrap/Pagination';
import ProjectListSummary from "../components/search-list-summary/ProjectListSummary";
import ProjectDetail from "../components/search-item-detail/ProjectDetail";
import {ProjectService} from "../services/Project.service"; 
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {MasterDataService} from '../services/MasterData.service';

class SearchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: { projects: [], totalRecord: 0 },
            project: {},
            modalShowApplied: false,
            activePage: 1,
            totalPage: 5,
            value: '',
            states:[],
            keyword:'',
        }
        this.getProjectDetail = this.getProjectDetail.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.keywordChange = this.keywordChange.bind(this);

    }

    componentDidMount() {
        this.loadProject(1);
      //  this.getCountries();
    }


    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        MasterDataService.getGenericLocationsByName(inputValue)
            .then(response => {
                this.setState({ states: response });
                return inputLength === 0 ? [] : this.state.states.filter(lang =>
                    lang.name.toLowerCase().slice(0, inputLength) === inputValue);
            }

            );

        return this.state.states;
    };

     // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            states: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            states: []
        });
    };

    getSuggestionValue = suggestion => suggestion.name;

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div style={{textAlign:"left"}}>
            <b>{suggestion.name}</b>
        </div>
    );

    loadProject(pageNumber) {
        ProjectService.searchProject(this.state.keyword,this.state.value,pageNumber)
        .then((result) => {
            this.setState({ searchResult: result, activePage: pageNumber, project:[] })
            if(this.state.searchResult.projects && this.state.searchResult.projects.length ){
                this.getProjectDetail(this.state.searchResult.projects[0].id);
            }
        })
    }

    searchProject(e) {
        e.preventDefault();
        this.loadProject(1);
    }

    getProjectDetail(projectId) {
        ProjectService.getProjectDetail(projectId)
        .then((result) => { this.setState({ project: result})})
    }

    showAlert(isShow) {
        this.setState({ modalShowApplied: isShow });
    }

    handlePageChange(pageNumber) {
        this.loadProject(pageNumber);
    }


    onLocation = (event, { newValue }) => {
        this.setState({
            value: newValue
        });

    };

    keywordChange(event) {
        const target = event.target;
        const value =  target.value;
        this.setState({
            keyword : value
        })
    }

    render() {
        const {
            searchResult,
            project,
            modalShowApplied,
            activePage,
            value,
            states,
            keyword
        } = this.state;
        let alert = (modalShowApplied) ? <Alert className="mb-0"> <i className="material-icons mr-1" style={{ fontSize: "25px", fontWeight: "bold" }}>done</i><span>Your Application Has Been Submitted</span></Alert> : <div></div>;
        let items = [];
        let totalNpage = Math.ceil(searchResult.totalRecord / 10);
        const inputProps = {
            placeholder: 'Location',
            value,
            onChange: this.onLocation
        };
        for (let number = 1; number <= totalNpage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === activePage} onClick={this.handlePageChange.bind(this, number)}>{number}</Pagination.Item>,
            );
        }
        return (
            <Container fluid className="main-content-container">
                <Row>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Card>
                            <CardBody style={{ padding: "1rem" }}>
                                <form id="searchProject"  onSubmit={this.searchProject.bind(this)}>
                                    <Row form>
                                        <Col md="12" style={{ display: "flex", flexDirection: "row", textAlign: "center", padding: "0 15%" }}>
                                            <input type="text" className="react-autosuggest__input" placeholder="Enter Keywords" name={keyword} onChange={(e) => {this.keywordChange(e) }} style={{ flexGrow: "2", height:"40px",flexBasis: "40%" }} />
                                            <div style={{ flexGrow: "2", marginRight: "2px", flexBasis: "40%", height:"100%" }} >
                                            <Autosuggest
                                                id="states"
                                                suggestions={states}
                                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                getSuggestionValue={this.getSuggestionValue}
                                                renderSuggestion={this.renderSuggestion}
                                                inputProps={inputProps}
                                            />
                                            </div>
                                            <Button theme="primary" className="mb-2 mr-1" style={{height:"40px"}} type="submit">{"  Search  "}</Button>
                                        </Col>
                                    </Row>
                                </form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row >
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        {alert}
                    </Col>
                </Row>
                <div className="centerPosition">
                    <Row className="py-4">
                        <Col md="5" style={{ padding: "0 2px" }}>
                            <ProjectListSummary projects={searchResult.projects} getProjectDetail={this.getProjectDetail} showAlert={this.showAlert} />
                            <div style={{marginTop:"1rem"}}> <Pagination>{items}</Pagination> </div>
                        </Col>
                        <Col md="7" style={{ padding: "0 2px" }}>
                            <ProjectDetail project={project} accountId={this.props.accountId} showAlert={this.showAlert} />
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}
// Map Redux state to component props
function mapStateToProps(state) {
    return {
        accountId : state.LinkxReducer.accountId
    }
  }
  
export default connect(mapStateToProps)(SearchProject)