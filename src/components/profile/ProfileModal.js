import React from "react";
import { Modal } from 'react-bootstrap';
import { Row, Col, FormInput, Button,} from "shards-react";
import Select from 'react-select';
import { MasterDataService } from "../../services/MasterData.service";
import { UserService } from "../../services/User.service";
import ReactDOM from 'react-dom';
import  ReactTags  from 'react-tag-autocomplete';


const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.updateProfileSubmit = this.updateProfileSubmit.bind(this);
        this.state = {
            modalOpen: false,
            countries: [],
            states: [],
            tags: [ { id: '9e78e15a-4275-11e9-8972-aca63e449b3c', name: 'Food' }, ],
            suggestions: [
                { id: '9e78e15a-4275-11e9-8972-aca63e449b3c', name: 'Food' },
                { id: 'b582b75e-4275-11e9-8972-aca63e449b3c', name: 'Sport' },
                { id: 'a4f0ce30-4275-11e9-8972-aca63e449b3c', name: 'Travel' },
                { id: 'a8517a98-4275-11e9-8972-aca63e449b3c', name: 'Cosmetics' },
                { id: 'b184719c-4275-11e9-8972-aca63e449b3c', name: 'Gadget' }
             ]
        }
    }

    componentDidMount() {
    }

    showEditModal() {
        this.setState({
            modalOpen: true,
        });
        this.getCountries();
        this.getStatesByCountryId(this.props.profile.country.id);
    }

    updateProfileSubmit(event) {
        event.preventDefault();
        UserService.updateProfileOverview(this.props.profile);
        this.setState({ modalOpen: false });
    }

    getCountries() {
        MasterDataService.getCountries()
            .then((result) => { this.setState({ countries: result }); });
    }

    getStatesByCountryId(countryId){
        MasterDataService.getStatesByCountryId(countryId)
        .then((result) => { this.setState({ states: result }); });
    }



    handleCtryDDChange(event) {
        this.props.handleCtryDDChange(event);
        this.getStatesByCountryId(event.value);
    }

    handleStatesDDChange(event) {
        this.props.handleStatesDDChange(event);
    }

    render() {
        const {
            modalOpen,
            countries,
            states,
        } = this.state;
        const {
            profile
        } = this.props;
        let modalClose = () => this.setState({ modalOpen: false });
        const { suggestions,tags } = this.state;
        return (
            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={modalOpen} onHide={modalClose}>
                <form id="updateProfileForm" onSubmit={this.updateProfileSubmit}>
                    <Modal.Header closeButton className="p-3">Update Profile</Modal.Header>
                    <Modal.Body>
                        <Row form>
                            <Col md="6">
                                <label htmlFor="summary">First Name</label>
                                <FormInput
                                    required
                                    name="fName"
                                    value={profile.fName}
                                    onChange={e => this.props.handleChange(e)}
                                />
                            </Col>
                            <Col md="6" className="form-group">
                                <label htmlFor="summary">Last Name</label>
                                <FormInput
                                    required
                                    name="lName"
                                    value={profile.lName}
                                    onChange={e => this.props.handleChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="summary">Summary</label>
                                <FormInput
                                    required
                                    name="summary"
                                    value={profile.summary}
                                    onChange={e => this.props.handleChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="6">
                                <label htmlFor="countryId">Country</label>
                                <Select autoFocus
                                    value={profile.country.value}
                                    onChange={this.handleCtryDDChange.bind(this)}
                                    options={countries}
                                />
                            </Col>
                            <Col md="6" className="form-group">
                                <label htmlFor="postalCode">Zip Code</label>
                                <FormInput
                                    name="postalCode"
                                    value={profile.postalCode}
                                    onChange={e => this.props.handleChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                            <label htmlFor="states">States</label>
                            <Select autoFocus
                                    value={profile.states.value}
                                    onChange={this.handleStatesDDChange.bind(this)}
                                    options={states}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                                <label htmlFor="description">Description</label>
                                <FormInput
                                    required
                                    name="description"
                                    value={profile.description}
                                    onChange={e => this.props.handleChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="12" className="form-group">
                            <label htmlFor="description">Category</label>
                            <ReactTags
                                tags={profile.brandSpecs}
                                suggestions={this.state.suggestions}
                                handleDelete={this.props.handleTagsDelete}
                                handleAddition={this.props.handleTagsAddition} 
                                classNames={{
                                    searchInput: "tagInputFieldClass",
                                    /*
                                    tags: 'tagsClass',
                                    tagInput: 'tagInputClass',
                                   
                                    selected: 'selectedClass',
                                    tag: 'tagClass',
                                    remove: 'removeClass',
                                    suggestions: 'suggestionsClass',
                                    activeSuggestion: 'activeSuggestionClass'
                                    */
                                }}
                              />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button theme="primary" className="mb-2 mr-1" type="submit" >Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default ProfileModal;