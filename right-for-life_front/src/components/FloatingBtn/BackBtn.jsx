import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FloatingBtn } from './FloatingBtn';

const BackBtn = ({ position, urlForBackBtn }) => (
  <div className="relative width-full">
    <FloatingBtn
      icon="arrow-left"
      position={position}
      onClick={urlForBackBtn ? null : () => window.history.back()}
      url={urlForBackBtn}
    />
  </div>
);

BackBtn.propTypes = {
  position: PropTypes.string,
  urlForBackBtn: PropTypes.string,
};

BackBtn.defaultProps = {
  position: 'left-0 ml-2 mt-2',
  urlForBackBtn: '',
};

const withConnect = connect(state => ({ urlForBackBtn: state.urlForBackBtn }))(
  BackBtn,
);

export { withConnect as BackBtn };
