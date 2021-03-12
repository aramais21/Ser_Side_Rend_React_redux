import {FETCH, FETCH_FAILURE, FETCH_SUCCESS, DELETE} from './index';

export const successFetchObj = (payload) => ({type: FETCH_SUCCESS, payload});
export const failureFetchObj = () => ({type: FETCH_FAILURE, payload: {message: "Failure"}});
export const fetchObj = () => ({type: FETCH});
export const deleteObj = () => ({type: DELETE});