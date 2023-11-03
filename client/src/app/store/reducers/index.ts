import { combineReducers } from 'redux';
import { usersReducer } from './users';
import { ticketsReducer } from './tickets';

const rootReducer = combineReducers({ usersReducer, ticketsReducer });

export default rootReducer;
