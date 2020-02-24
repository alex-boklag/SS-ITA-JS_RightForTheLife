import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_DATA_REQUEST } from './constants';
import { successData, failureData, resetData } from './actions';

function* fetchData({ payload: { api, name } }) {
  yield put(resetData(name));

  let success = null;
  let failure = null;

  yield fetch(api, {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.getItem('token'),
    }
  })
    .then(response => response.json())
    .then(data => {
      success = data;
    })
    .catch(error => {
      failure = error;
    });

  yield put(success ? successData({ success, name }) : failureData(failure));
}

export function* fetchDataWatcher() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchData);
}
