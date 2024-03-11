import { getItemWeather } from "../../loaclStorage/localStorage";

const firstState = getItemWeather('weather') || []; 


export function reducerAddUser(state = firstState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return [...state, action.payload];
        case 'REMOVE_USER':
            return state.filter(user => user !== action.payload);
        default:
            return state;
    }
}
