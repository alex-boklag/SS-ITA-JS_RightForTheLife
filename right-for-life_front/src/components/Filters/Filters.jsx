import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '../../helpers/useQuery';
import { FiltersItem } from './FiltersItem';

const updateQuery = (params, location, history, query) => {
  query.delete('page');

  const entriesParams = Object.entries(params);

  if (entriesParams.length > 0) {
    entriesParams.forEach(([key, value]) => query.set(key, value));
    history.push(`${location.pathname}?${query.toString()}`);
  }
};

export const Filters = ({ filters }) => {
  const form = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const initialParams = {};

  query.delete('page');

  [...query.entries()].forEach(([key, value]) => {
    if (key !== 'limit') initialParams[key] = value;
  });

  const [params, setParams] = useState(initialParams);

  return (
    <form
      className="flex flex-wrap md:flex-no-wrap md:justify-center justify-around items-center mx-4 mb-6 p-1 rounded-xl shadow-lg bg-white"
      ref={form}
      onSubmit={e => {
        e.preventDefault();
        updateQuery(params, location, history, query);
      }}
    >
      <ul className="flex flex-wrap sm:flex-no-wrap w-full md:pr-2 md:border-r md:border-gray-300">
        {filters.map(filter => (
          <li key={filter[1]} className="w-1/2 p-2">
            <FiltersItem
              filter={filter}
              updateParams={([key, value]) =>
                setParams({ ...params, [key]: value })
              }
              params={params}
            />
          </li>
        ))}
      </ul>
      <button
        type="submit"
        className={`m-2 md:ml-4 text-lg font-bold text-${
          Object.keys(params).length ? 'blue-700' : 'gray-600'
        } focus:outline-none`}
        disabled={Object.keys(params).length === 0}
      >
        Применить
      </button>
      <button
        className={`m-2 md:mr-4 text-lg font-bold text-${
          Object.keys(params).length ? 'red-700' : 'gray-600'
        } focus:outline-none`}
        onClick={() => {
          setParams([]);
          form.current.reset();
          history.push(location.pathname + (query.has('limit')
            ? `?limit=${query.get('limit')}`
            : ''));
        }}
        disabled={Object.keys(params).length === 0}
      >
        Очистить
      </button>
    </form>
  );
};
