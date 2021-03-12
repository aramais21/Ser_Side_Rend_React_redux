import {successFetchObj, failureFetchObj} from '../actions/objectCreators';

import { call, put, takeEvery } from 'redux-saga/effects';

import { FETCH } from '../actions';

const fecthJson = () => (
    new Promise((res, rej) => {
        const timeout = setTimeout(async () => {
            const resp = await fetch('./data.json');
            res(resp.json());
            clearTimeout(timeout)
        }, 2000);
    })
)

function* fetchData ({payload}) {
    try {
        const data = yield call(fecthJson, payload);
        yield put(successFetchObj(data));
    }
    catch (err) {
        yield put(failureFetchObj());
    }
}

function* mySaga () {
    yield takeEvery(FETCH, fetchData);
}

export default mySaga;