import {createStore} from 'redux'
import {combineReducers} from 'redux'
import LinkxReducer from './Reducer'

const reducer = combineReducers({
    LinkxReducer
});

const initialState = {
    LinkxReducer: {accountId:"398765f0-4220-11e9-8972-aca63e449b3c"}
};


let store = createStore(reducer, initialState);

export default store;
