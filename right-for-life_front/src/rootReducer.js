import { combineReducers } from 'redux';
import { fetchDataReducer } from './hoc/withFetchDataIndicators';
import { urlForBackBtnReducer as urlForBackBtn } from './components/SiteContentContainer';

export const rootReducer = combineReducers({
  fetchDataReducer,
  urlForBackBtn,
});
