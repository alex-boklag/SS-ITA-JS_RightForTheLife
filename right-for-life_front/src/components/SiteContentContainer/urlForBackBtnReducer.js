import { SET_URL_FOR_BACK_BTN } from './constants';

export const urlForBackBtnReducer = (state = '/', action) => {
  const { type, payload } = action;

  if (type === SET_URL_FOR_BACK_BTN) {
    return payload;
  }
  return state;
};
