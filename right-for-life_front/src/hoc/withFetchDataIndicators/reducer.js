import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_REQUEST,
  FETCH_DATA_RESET,
} from './constants';

export const fetchDataReducer = (state = { data: {}, error: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DATA_RESET: {
      const { data } = state;

      delete data[payload];

      return { ...state, data };
    }

    case FETCH_DATA_REQUEST: {
      return { ...state, error: null };
    }

    case FETCH_DATA_FAILURE: {
      return { ...state, error: payload };
    }

    case FETCH_DATA_SUCCESS: {
      const { success, name } = payload;
      const { data } = state;

      data[name] = success;

      return { ...state, data };
    }

    default: {
      return state;
    }
  }
};
