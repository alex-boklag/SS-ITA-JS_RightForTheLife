import { UPD_BACK_BTN_STATUS } from '../../rootConstants';

export const useOrNotGoBackReducer = (state = false, action) => {
  const {type, payload} = action;

  if (type === UPD_BACK_BTN_STATUS) {
    return payload;
  } else {
    return state;
  }
};