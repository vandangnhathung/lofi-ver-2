import {combineReducers} from 'redux';
import userReducer from './userReducer';

const appReducer = combineReducers({
    user: userReducer,
    // other reducers can be added here
});

export default appReducer;