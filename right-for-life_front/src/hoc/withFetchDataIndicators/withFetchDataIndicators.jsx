import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import PropTypes from 'prop-types';
import { requestData } from './actions';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { LoadIndicator } from '../../components/LoadIndicator';

export const withFetchDataIndicators = (WrappedComponent, dataName, dataApi) => (props) => {
  const name = dataName;
  const api = dataApi;
  const dispatch = useDispatch();
  let { error, data } = useSelector(({ fetchDataReducer }) => ({ ...fetchDataReducer }));

  data = data[name]; 

  useEffect(() => {
    if (!data) {
      dispatch(requestData({ api, name }));
    }
  }, [data, api, name, dispatch]);

  const action = (
    <button 
      className="mt-1 font-bold text-orange-400 hover:text-orange-500 uppercase"
      onClick={() => dispatch(requestData({ api, name }))}>
      Обновить
    </button>
  );

  if (error) return <ErrorIndicator message="Упс... Ошибка!" renderAction={() => action} />
  if (!data) return <LoadIndicator message="Загружаем данные..." />
  if (data) return <WrappedComponent {...props} data={data} />
};

withFetchDataIndicators.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  dataName: PropTypes.string.isRequired,
  dataApi: PropTypes.string.isRequired,
}
