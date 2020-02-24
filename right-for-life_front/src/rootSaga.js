import { all } from 'redux-saga/effects';
import { fetchDataWatcher } from './hoc/withFetchDataIndicators';

export function* rootSaga() {
  yield all([fetchDataWatcher()]);
}
