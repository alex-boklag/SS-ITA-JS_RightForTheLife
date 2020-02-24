import React from 'react';
import PropTypes from 'prop-types';
import dog from '../../assets/dog.png';

export const ErrorIndicator = ({ message, renderAction }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-lightgray-700">
      <img className="mx-3" src={dog} alt="error" width="80" />
      <p className="mt-3 text-2xl font-bold">{message}</p>
      {renderAction && (
        <p className="mt-2 text-gray-600 hover:text-gray-700">
          {renderAction()}
        </p>
      )}
    </div>
  );
};

ErrorIndicator.defaultProps = {
  message: 'Ошибка!',
};

ErrorIndicator.propTypes = {
  message: PropTypes.string,
  renderAction: PropTypes.func,
};
