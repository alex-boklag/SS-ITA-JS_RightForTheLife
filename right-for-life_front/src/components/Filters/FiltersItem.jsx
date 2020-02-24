import React from 'react';

export const FiltersItem = ({ filter, updateParams, params }) => {
  const [key, value] = filter;

  return (
    <>
      <input
        className="hidden"
        type="radio"
        name={key}
        id={value}
        onClick={() => {
          updateParams(filter);
        }}
      />
      <label
        className={`block w-full p-2 rounded-lg text-center text-lg text-gray-600 bg-gray-100 cursor-pointer uppercase font-bold ${
          params[key] === value ? 'text-blue-700 bg-blue-200' : ''
        }`}
        htmlFor={value}
      >
        {value}
      </label>
    </>
  );
};
