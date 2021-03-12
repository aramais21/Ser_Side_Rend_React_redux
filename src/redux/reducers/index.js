import {produce} from 'immer';
import { DELETE, FETCH_FAILURE, FETCH_SUCCESS } from '../actions';

export const reducer = produce((state, {type, payload}) => {
    switch(type) {
        case FETCH_SUCCESS:
            state.data = payload;
            return state;
        case FETCH_FAILURE:
            state.data = [];
            return state;
        case DELETE:
            state.data = [];
            return state;
        default: 
            return state;
    }
})