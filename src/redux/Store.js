import {createStore} from 'redux'
import {combineReducers} from 'redux'
import LinkxReducer from './AccountToDo'

const reducer = combineReducers({
    LinkxReducer
});

const initialState = {
    //LinkxReducer: {accountId:"bc09b96a-5b0f-49ee-ac06-57ccf6bb457d"}
    LinkxReducer: {accountId:"398765f0-4220-11e9-8972-aca63e449b3c",avatar:"https://res.cloudinary.com/dw2ssncv1/image/upload/v1558159144/profile-pict/67a016f5-b213-4ad8-a211-10aa14953626.png"}
   // LinkxReducer: {accountId:"b41c8a8e-6b10-4bae-8a83-f3ab8b1601bf"}
   // LinkxReducer: {accountId:""}
};


let store = createStore(reducer, initialState);
//let store = createStore(initialState);

export default store;
