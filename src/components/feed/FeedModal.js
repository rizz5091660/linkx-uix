import React from "react";
import { Modal } from 'react-bootstrap';
import { Row, Col, FormInput, Button, } from "shards-react";
import Select from 'react-select';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6 
import Autosuggest from 'react-autosuggest';
import DatePicker from 'react-datepicker';
import {MasterDataService} from '../../services/MasterData.service';
import {ProjectService} from '../../services/Project.service';


class FeedModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            labelTitle: 'Collaboration',
            type: { value: 'collaboration', label: 'Collaboration' },
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            name: '',
            collabType: '',
            collabTypes: [{ value: 'skill', label: 'Skill' }, { value: 'sponsor', label: 'Sponsor' }, { value: 'gift', label: 'Gifting' },],
            skills: [],
            sponsoredItems: [],
            sponsorValue: '',
            states: [],
            statesValue: '',
            skillValue: '',
            startDate: null,
            endDate: null,
        }
    }

    showEditModal(type) {
        this.setState({
            modalOpen: true
        });
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChangeRichText(value) {
        this.setState({ description: value })
    }

    handleDDChange(event) {
        this.setState({ collabType: event });
    }

    getSkillSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        MasterDataService.getSkillsSuggestionByName(value)
            .then(response => {
                this.setState({ skills: response });
                return inputLength === 0 ? [] : this.state.skills.filter(lang =>
                    lang.name.toLowerCase().slice(0, inputLength) === inputValue);
            }

            );

        return this.state.skills;
    };

    onSkillSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            skills: this.getSkillSuggestions(value)
        });
    };

    onSkillSuggestionsClearRequested = () => {
        this.setState({
            skills: []
        });
    };

    getSkillSuggestionValue = suggestion => suggestion.name;

    renderSkillSuggestion = suggestion => (
        <div>
            <b>{suggestion.name}</b>
        </div>
    );

    onSkillChange = (event, { newValue }) => {
        this.setState({
            skillValue: newValue
        });

    };


    getSponsorSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        MasterDataService.getSponsoredItemsSuggestionByName(value)
            .then(response => {
                this.setState({ sponsoredItems: response });
                return inputLength === 0 ? [] : this.state.sponsoredItems.filter(lang =>
                    lang.name.toLowerCase().slice(0, inputLength) === inputValue);
            }

            );
        return this.state.sponsoredItems;
    };

    onSponsorSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            sponsoredItems: this.getSponsorSuggestions(value)
        });
    };

    onSponsorSuggestionsClearRequested = () => {
        this.setState({
            sponsoredItems: []
        });
    };

    getSponsorSuggestionValue = suggestion => suggestion.name;

    renderSponsorSuggestion = suggestion => (
        <div>
            <b>{suggestion.name}</b>
        </div>
    );

    onSponsorChange = (event, { newValue }) => {
        this.setState({
            sponsorValue: newValue
        });

    };


    getStatesSuggestions = value => {
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

    onStatesSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            states: this.getStatesSuggestions(value)
        });
    };

    onStatesSuggestionsClearRequested = () => {
        this.setState({
            states: []
        });
    };

    getStatesSuggestionValue = suggestion => suggestion.name;

    renderStatesSuggestion = suggestion => (
        <div>
            <b>{suggestion.name}</b>
        </div>
    );

    onStatesChange = (event, { newValue }) => {
        this.setState({
            statesValue: newValue
        });

    };

    handleCalendarChange(name, value) {
        this.setState({ [name]: value });
    }

    addProjectSubmit(e) {
        e.preventDefault();
        this.setState({ modalOpen: false });
       ProjectService.add(this.state.name,this.state.collabType,this.state.startDate,this.state.endDate,this.state.statesValue, this.state.description, this.state.skillValue, this.state.sponsorValue, this.props.accountId,null);
    }


    render() {
        const {
            modalOpen,
            type,
            title,
            description,
            startDate,
            endDate,
            name,
            labelTitle,
            collabType,
            collabTypes,
            skills,
            sponsoredItems,
            sponsorValue,
            skillValue,
            statesValue,
            states
        } = this.state;
        let modalClose = () => this.setState({ modalOpen: false });
        const inputSkillProps = {
            placeholder: 'Ex: Brand Creator',
            value: skillValue,
            onChange: this.onSkillChange
        };
        const inputSponsorProps = {
            placeholder: 'Ex: Hotel',
            value: sponsorValue,
            onChange: this.onSponsorChange
        };
        const inputStatesProps = {
            placeholder: 'Ex: Sydney',
            value: statesValue,
            onChange: this.onStatesChange
        };
        let suggestionContainer;

        if (collabType.value == 'skill') {
            suggestionContainer = <Row form>
                <Col className="form-group">
                    <label htmlFor="skillName">Skill Name</label>
                    <Autosuggest
                        id="client"
                        suggestions={skills}
                        onSuggestionsFetchRequested={this.onSkillSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSkillSuggestionsClearRequested}
                        getSuggestionValue={this.getSkillSuggestionValue}
                        renderSuggestion={this.renderSkillSuggestion}
                        inputProps={inputSkillProps}
                    />
                </Col>
            </Row>;
        } else if (collabType.value == 'sponsor') {
            suggestionContainer = <Row form>
                <Col className="form-group">
                    <label htmlFor="skillName">Sponsored Item</label>
                    <Autosuggest
                        id="client"
                        suggestions={sponsoredItems}
                        onSuggestionsFetchRequested={this.onSponsorSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSponsorSuggestionsClearRequested}
                        getSuggestionValue={this.getSponsorSuggestionValue}
                        renderSuggestion={this.renderSponsorSuggestion}
                        inputProps={inputSponsorProps}
                    />
                </Col>
            </Row>
        }

        return (

            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={modalOpen} onHide={modalClose}>
                <form id="updateProfileForm" onSubmit={this.addProjectSubmit.bind(this)}>
                    <Modal.Header closeButton className="p-3">Post Project</Modal.Header>
                    <Modal.Body>
                        <Row form>
                            <Col className="form-group">
                                <label htmlFor="name">Summary</label>
                                <FormInput
                                    required
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col className="form-group">
                                <label htmlFor="collabType">Looking For</label>
                                <Select
                                    value={collabType}
                                    onChange={this.handleDDChange.bind(this)}
                                    options={collabTypes}
                                />
                            </Col>
                        </Row>
                        {suggestionContainer}
                        <Row form>
                            <Col md="6" className="form-group">
                                <label htmlFor="startDate">Start Date</label><br />
                                <DatePicker
                                    selected={startDate}
                                    onChange={this.handleCalendarChange.bind(this, 'startDate')}
                                    dateFormat="yyyy/MM/dd"
                                />
                            </Col>
                            <Col md="6" className="form-group">
                                <label htmlFor="endDate">End Date</label><br />
                                <DatePicker
                                    selected={endDate}
                                    onChange={this.handleCalendarChange.bind(this, 'endDate')}
                                    dateFormat="yyyy/MM/dd"
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col className="form-group">
                                <label htmlFor="location">Location</label>
                                <Autosuggest
                                    id="states"
                                    suggestions={states}
                                    onSuggestionsFetchRequested={this.onStatesSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onStatesSuggestionsClearRequested}
                                    getSuggestionValue={this.getStatesSuggestionValue}
                                    renderSuggestion={this.renderStatesSuggestion}
                                    inputProps={inputStatesProps}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col className="form-group">
                                <label htmlFor="description">Description</label>
                                <ReactQuill value={description} style={{ height: "300px" }}
                                    onChange={this.handleChangeRichText.bind(this)} />
                            </Col>
                        </Row>
                        <Row form style={{ paddingTop: "3rem" }}>
                            <Col className="form-group">
                                <label>Upload Image</label>
                                <Button theme="primary" style={{marginLeft:"30px"}} className="mb-2 mr-1" >Upload</Button>
                            </Col>
                        </Row>
                        <Row form>
                            <Col className="form-group">
                                <Button theme="primary" className="mb-2 mr-1" type="submit" >Post</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </form>
            </Modal>

        );
    }
}


export default FeedModal;