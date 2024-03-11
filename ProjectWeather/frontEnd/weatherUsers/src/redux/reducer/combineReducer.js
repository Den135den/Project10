import { combineReducers } from "redux";
import {reducerAddUser} from './reducer.js'


export default combineReducers({
    data: reducerAddUser
})