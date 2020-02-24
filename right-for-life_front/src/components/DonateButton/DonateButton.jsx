import React from 'react';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';

const DonateButton = ({ className, style, data }) => {
  return (
    <a
      className={className}
      rel="noopener noreferrer"
      target="_blank"
      href={`https://next.privat24.ua/payments/form/%7B%22token%22:%22${data.privat24Token}%22%7D`}
      style={style}
    >
      Помочь
    </a>
  );
};

DonateButton.defaultProps = {
  style: null,
  className:
    'min-w-5/12 bg-yellow-300 text-yellow-700 hover:bg-yellow-400 hover:text-yellow-800 font-bold py-1 px-3 rounded-xl',
};

const wrappedComponent = withFetchDataIndicators(DonateButton, API.DONATE);

export { wrappedComponent as DonateButton };
