import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    Row,
    Col,
    FormInput,
    Button,
    FormTextarea
} from "shards-react";
import Autosuggest from 'react-autosuggest';
import DatePicker from 'react-datepicker';


class EditAccountProjectModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            accountProject: { clientName: '', clientId: '', name: '', applyDate: null, endDate: null, jobDesc: '' },
            suggestions: [],
            value: '',
            jobDesc: '',
            url:'',
            jobTitle:'',
            applyDate: null,
            companies: []
        }
    }

    showEditModal() {
        this.setState({ modalOpen: true });
    }

    addProjectSubmit(e) {
        e.preventDefault();
        this.setState({ modalOpen: false });
        this.props.addProjectSubmit(this.state.url,this.state.value, this.state.applyDate, this.state.jobDesc,this.state.jobTitle);
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });

    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        fetch("http://localhost:8080/api/data/organization/autocomplete/" + value, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ companies: response });
                return inputLength === 0 ? [] : this.state.companies.filter(lang =>
                    lang.name.toLowerCase().slice(0, inputLength) === inputValue);
            }

            );

        return this.state.companies;
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => (
        <div>
            <b>{suggestion.name}</b>
        </div>
    );

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleCalendarChange(value) {
        this.setState({ applyDate: value });
    }
    render() {
        const {
            modalOpen,
            accountProject,
            value,
            suggestions,
            jobDesc,
            url,
            jobTitle
        } = this.state;
        let modalClose = () => this.setState({ modalOpen: false });
        const inputProps = {
            placeholder: 'Ex: Coca-Cola',
            value,
            onChange: this.onChange
        };
        return (
            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={modalOpen} onHide={modalClose}>
                <form id="updateProfileForm" onSubmit={this.addProjectSubmit.bind(this)}>
                    <Modal.Header closeButton className="p-3">Update Profile</Modal.Header>
                    <Modal.Body>
                    <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="url">URL</label>
                                <FormInput name="url" value={url} onChange={this.handleInputChange.bind(this)} style={{ width: "90%" }} />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="client">Client</label>
                                <Autosuggest
                                    id="client"
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="jobTitle">Title</label>
                                <FormInput name="jobTitle" value={jobTitle} onChange={this.handleInputChange.bind(this)} style={{ width: "90%" }} />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="applyDate">Date</label><br />
                                <DatePicker
                                    selected={this.state.applyDate}
                                    onChange={this.handleCalendarChange.bind(this)}
                                    dateFormat="yyyy/MM/dd"
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="jobDesc">Job Description</label><br />
                                <FormTextarea value={jobDesc} row="5" name="jobDesc" onChange={this.handleInputChange.bind(this)} style={{ width: "90%" }} />
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button theme="primary" className="mb-2 mr-1" type="submit">Add</Button>
                    </Modal.Footer>
                </form>


            </Modal>

        );
    }

}
export default EditAccountProjectModel;