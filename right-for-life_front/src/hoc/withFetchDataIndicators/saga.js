import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_DATA_REQUEST } from './constants';
import { successData, failureData } from './actions';

export function* fetchDataWatcher() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}

function* fetchData({ payload: { api, name } }) {  
  let success = null;
  let failure = null;

  yield fetch(api)
    .then(response => response.json())
    .then(data => success = data)
    .catch(error => failure = error);

  yield put(success ? successData({ success, name }) : failureData(failure));
}
