import React from "react";
import { Modal } from 'react-bootstrap';
import { Row, Col, FormInput, Button, } from "shards-react";
import Select from 'react-select';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6 
import Autosuggest from 'react-autosuggest';
import DatePicker from 'react-datepicker';
import { MasterDataService } from '../../services/MasterData.service';
import { ProjectService } from '../../services/Project.service';
import { OfferService } from '../../services/Offer.service';

class FeedModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new FormData(),
            modalOpen: false,
            labelTitle: 'Collaboration',
            type: '',
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
            offerCategories: [],
            offerCategory: '',
            bannerFile:null,
            bannerDisplay:''
        }
    }

    showPostModal(type) {
        let title = '';
        if (type == 'offer') {
            title = 'Offer';
        } else if (type == 'project') {
            title = 'Project';
        }
        this.setState({
            modalOpen: true,
            type: type,
            title: title
        });
        MasterDataService.getOfferCategory()
            .then(response => {
                this.setState({ offerCategories: response });
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

    handleDDChange(source, event) {
        console.log(`event ${event} source ${source}`);
        if (source === 'collabType')
            this.setState({ collabType: event });
        else if (source === 'offerCategory')
            this.setState({ offerCategory: event });
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

    addSubmit(e) {
        e.preventDefault();
        console.log(this.state.type+" "+e)
        if (this.state.type === 'project') {
            this.addProjectSubmit(e);
        } else if (this.state.type === 'offer') {
            this.addOfferSubmit(e);
        }
    }

    addProjectSubmit(e) {
        e.preventDefault();
        const project = {
            name: this.state.name,
            collabType: this.state.collabType.value,
            startDateStr: this.state.startDate,
            endDateStr: this.state.endDate,
            location: this.state.statesValue,
            description: this.state.description,
            skillValue: this.state.skillValue,
            sponsorValue:this.state.sponsorValue,
            accountId:this.props.accountId,
            organizationId:null,
            offerCategory:null
    
        };
        let data = new FormData();
        data.append('banner', this.state.bannerFile);
        data.append('post', JSON.stringify(project));
        this.setState({ modalOpen: false,data:data });
        ProjectService.add(data);
    }

    addOfferSubmit(e) {
        e.preventDefault();
        const offer ={
            name:this.state.name,
            startDate:this.state.startDate, 
            endDate:this.state.endDate, 
            location:this.state.statesValue, 
            description:this.state.description,
            accountId: this.props.accountId,
            organizationId:this.state.organizationId
        }
        let data = new FormData();
        data.append('banner',this.state.bannerFile);
        data.append('post', JSON.stringify(offer));
        this.setState({ modalOpen: false });
        OfferService.add(data);
    }

    handleUploadFile = (type,event) => {
        this.setState({bannerDisplay: URL.createObjectURL(event.target.files[0]),bannerFile:event.target.files[0] });
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
            states,
            offerCategories,
            offerCategory,
            bannerDisplay

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
        let contentForm;
        let suggestionContainer;

        if (collabType.value === 'skill') {
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
        } else if (collabType.value === 'sponsor') {
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


        if (type === 'project') {
            contentForm = <div>
                <Row form>
                    <Col className="form-group">
                        <label htmlFor="collabType">Looking For</label>
                        <Select
                            value={collabType}
                            onChange={this.handleDDChange.bind(this, 'collabType')}
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
            </div>
        } else if (type === 'offer') {
            contentForm = <div>
                <Row form>
                    <Col className="form-group">
                        <label htmlFor="offerCategory">Select a Category</label>
                        <Select
                            value={offerCategory}
                            onChange={this.handleDDChange.bind(this, 'offerCategory')}
                            options={offerCategories}
                        />
                    </Col>
                </Row>
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
            </div>
        }


        return (

            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={modalOpen} onHide={modalClose}>
                <form id="updateProfileForm" encType="multipart/form-data" onSubmit={this.addSubmit.bind(this)}>
                    <Modal.Header closeButton className="p-3">Post {title}</Modal.Header>
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
                        {contentForm}
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
                                <ReactQuill value={description} style={{ height: "250px" }}
                                    onChange={this.handleChangeRichText.bind(this)} />
                            </Col>
                        </Row>
                        <Row form style={{ paddingTop: "3rem" }}>
                            <Col md="12">
                                <img src={bannerDisplay} width="400px" />
                            </Col>
                        </Row>
                        <Row form>
                            <Col className="form-group">
                                <input type="file" name="file" onChange={this.handleUploadFile.bind(this,'profile-banner')} />
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