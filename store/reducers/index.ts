import { combineReducers } from 'redux';
import authState from './auth-state';

const rootReducer = combineReducers({
    auth: combineReducers({
        state: authState
    })
});

export default rootReducer;