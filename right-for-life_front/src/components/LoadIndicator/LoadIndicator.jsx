import React from 'react';
import PropTypes from 'prop-types';
import './LoadIndicator.css';

export const LoadIndicator = ({ message }) => (
  <article className="w-full h-full flex flex-col justify-center items-center px-5 text-lightgray-700">
    <div className="loader loader-3">
      <div className="dot dot1" />
      <div className="dot dot2" />
      <div className="dot dot3" />
    </div>
    {message && (
      <p className="-mt-2 mb-2 text-xl text-center font-bold">{message}</p>
    )}
  </article>
);

LoadIndicator.defaultProps = {
  message: 'Загрузка...',
};

LoadIndicator.propTypes = {
  message: PropTypes.string,
};
