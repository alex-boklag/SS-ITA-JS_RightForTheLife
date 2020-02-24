import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import PropTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const FloatingBtn = ({
  icon,
  position,
  onClick,
  url,
  content,
  visible,
}) => {
  const className = `floating-button absolute z-20 bg-white hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-lg text-gray-700 text-lg h-12 w-12 focus:outline-none ${position}`;
  const iconElem = content || <i className={`fas fa-${icon}`} />;

  return (
    <CSSTransition
      in={visible}
      unmountOnExit
      appear
      addEndListener={(node, done) =>
        node.addEventListener('transitionend', done, false)
      }
      classNames="floating-button"
    >
      {!onClick && url ? (
        <Link className={className} to={url}>
          {iconElem}
        </Link>
      ) : (
        <div // eslint-disable-line jsx-a11y/click-events-have-key-events
          role="button"
          onClick={onClick}
          className={className}
          tabIndex={-1}
        >
          <SwitchTransition>
            <CSSTransition
              key={icon}
              timeout={100}
              classNames="floating-button__icon"
            >
              {iconElem}
            </CSSTransition>
          </SwitchTransition>
        </div>
      )}
    </CSSTransition>
  );
};

FloatingBtn.propTypes = {
  icon: PropTypes.string,
  position: PropTypes.string,
  onClick: PropTypes.func,
  url: PropTypes.string,
  content: PropTypes.node,
  visible: PropTypes.bool,
};

FloatingBtn.defaultProps = {
  icon: '',
  position: 'left-0 ml-2 mt-2',
  onClick: null,
  url: null,
  content: null,
  visible: true,
};
