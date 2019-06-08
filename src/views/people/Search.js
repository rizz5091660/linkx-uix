import React from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormInput, Button, Alert } from "shards-react";
import Pagination from 'react-bootstrap/Pagination';
import ListSummary from "./ListSummary";
import Detail from "./Detail";
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { MasterDataService } from '../../services/MasterData.service';
import { PeopleService } from '../../services/People.service';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: { accounts: [], totalRecord: 0 },
            detail: {},
            modalShowApplied: false,
            activePage: 1,
            totalPage: 5,
            value: '',
            states: [],
            keyword: '',
        }
        this.getDetail = this.getDetail.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
    }

    componentDidMount() {
        this.load(1);
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

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            states: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            states: []
        });
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <div style={{ textAlign: "left" }}>
            <b>{suggestion.name}</b>
        </div>
    );

    load(pageNumber) {
        PeopleService.search(this.props.accountId,this.state.keyword, this.state.value, pageNumber)
            .then((result) => {
                this.setState({ searchResult: result, activePage: pageNumber, accounts: [] })
                if (this.state.searchResult.accounts && this.state.searchResult.accounts.length) {
                    this.getDetail(this.state.searchResult.accounts[0].id);
                } else {
                    this.setState({ detail: null })
                }
            })
        
    }

    search(e) {
        e.preventDefault();
        this.load(1);
    }

    getDetail(id) {
        PeopleService.get(id)
            .then((result) => { this.setState({ detail: result }) })
    }

    showAlert(isShow) {
        this.setState({ modalShowApplied: isShow });
    }

    handlePageChange(pageNumber) {
        this.load(pageNumber);
    }


    onLocation = (event, { newValue }) => {
        this.setState({
            value: newValue
        });

    };

    keywordChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            keyword: value
        })
    }

    render() {
        const {
            searchResult,
            detail,
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
                                <form id="searchForm" onSubmit={this.search.bind(this)}>
                                    <Row form>
                                        <Col md="12" style={{ display: "flex", flexDirection: "row", textAlign: "center", padding: "0 15%" }}>
                                            <input type="text" className="react-autosuggest__input" placeholder="Enter Keywords" name={keyword} onChange={(e) => { this.keywordChange(e) }} style={{ flexGrow: "2", height: "40px", flexBasis: "40%" }} />
                                            <div style={{ flexGrow: "2", marginRight: "2px", flexBasis: "40%", height: "100%" }} >
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
                                            <Button theme="primary" className="mb-2 mr-1" style={{ height: "40px" }} type="submit">{"  Search  "}</Button>
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
                    {searchResult.accounts != null && searchResult.accounts.length != 0 &&
                        <Row className="py-4">
                            <Col md="9">
                                <ListSummary accounts={searchResult.accounts} getProjectDetail={this.getDetail} showAlert={this.showAlert} />
                                <div style={{ marginTop: "1rem" }}> <Pagination>{items}</Pagination> </div>
                            </Col>
                            {/* 
                            <Col md="7">
                                <Detail project={detail} accountId={this.props.accountId} showAlert={this.showAlert} />
                            </Col>
                            */}
                        </Row>
                    }
                </div>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        accountId: state.LinkxReducer.accountId
    }
}

export default connect(mapStateToProps)(Search)