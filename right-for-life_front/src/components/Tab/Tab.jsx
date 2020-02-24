import React from 'react';

const Tab = ({ label, onClick, active, isEditModeBarOpen }) => {
  const colors = active
    ? 'bg-green-300 hover:bg-green-400 text-green-700 cursor-pointer'
    : 'bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-pointer';

  return (
    <li
      className={`flex-1 mr-2 text-center rounded-full py-2 px-4 ${colors} ${
        isEditModeBarOpen ? 'pointer-events-none' : ''
      }`}
      onClick={() => onClick(label)}
    >
      <button
        className={`outline-none font-bold ${
          isEditModeBarOpen ? 'cursor-not-allowed opacity-50' : ''
        }`}
        style={{ outline: 'none' }}
      >
        {label}
      </button>
    </li>
  );
};

export default Tab;
