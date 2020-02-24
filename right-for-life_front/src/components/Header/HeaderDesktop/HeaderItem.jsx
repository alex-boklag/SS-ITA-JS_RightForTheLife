import { NavLink } from 'react-router-dom';
import React from 'react';

export const HeaderItem = ({ to, title, color }) => {
  const className = `header-element cursor-pointer ${
    color
      ? `mx-3  text-${color}-700 bg-${color}-200 py-1 px-3 rounded-lg hover:bg-${color}-300 hover:text-${color}-800`
      : 'mx-4 hover:text-gray-700'
  }`;
  const activeClassName = color
    ? `bg-${color}-300 text-${color}-800`
    : 'text-gray-700';

  return (
    <NavLink
      exact
      to={to}
      className={className}
      activeClassName={activeClassName}
    >
      {title}
    </NavLink>
  );
};
