import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '../../helpers/useQuery';
import { requestData } from './actions';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { LoadIndicator } from '../../components/LoadIndicator';

export const withFetchDataIndicators = (
  WrappedComponent,
  API,
  isUpdate,
) => props => {
  const { error, data: dataStore } = useSelector(({ fetchDataReducer }) => ({
    ...fetchDataReducer,
  }));
  const dispatch = useDispatch();
  const query = useQuery().toString();
  const { id } = useParams();
  const { name, api: baseApi } = API;

  const data = dataStore[name];
  const api = `${baseApi}${id ? `/${id}` : ''}${query ? `?${query}` : ''}`;

  useEffect(() => {
    if (isUpdate || !data) dispatch(requestData({ api, name }));
  }, [query]);

  const action = (
    <button
      className="mt-1 font-bold text-orange-400 hover:text-orange-500 uppercase"
      onClick={() => dispatch(requestData({ api, name }))}
    >
      Обновить
    </button>
  );

  if (error)
    return (
      <ErrorIndicator message="Упс... Ошибка!" renderAction={() => action} />
    );
  if (!data) return <LoadIndicator message="Загружаем данные..." />;
  if (data) return <WrappedComponent {...props} data={data} />;
  return null;
};

withFetchDataIndicators.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  API: PropTypes.shape({
    name: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired,
  }).isRequired,
  isUpdate: PropTypes.bool,
};
