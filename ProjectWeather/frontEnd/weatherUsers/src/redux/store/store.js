import {createStore} from 'redux';
import combineReducer from '../reducer/combineReducer';


export default createStore(combineReducer);