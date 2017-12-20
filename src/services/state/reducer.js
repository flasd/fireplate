import { combineReducers } from 'redux';
import { reduxFireAuthReducer } from 'redux-fire-auth';

export default combineReducers({
    fireAuth: reduxFireAuthReducer,
});