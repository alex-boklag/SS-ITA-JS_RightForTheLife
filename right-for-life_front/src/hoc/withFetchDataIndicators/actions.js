import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_RESET,
} from './constants';

export const requestData = payload => ({
  type: FETCH_DATA_REQUEST,
  payload,
});

export const successData = payload => ({
  type: FETCH_DATA_SUCCESS,
  payload,
});

export const failureData = payload => ({
  type: FETCH_DATA_FAILURE,
  payload,
});

export const resetData = payload => ({
  type: FETCH_DATA_RESET,
  payload,
});
