import React from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../rootConstants';
import { AnimalDetails } from './AnimalDetails';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import './style.css';

const AnimalDetailsPage = ({ match, data }) => {
  const isEdit = true;
  const petId = match.params.id;

  if (isEdit && petId === 'new') {
    return <AnimalDetails isEdit isEditModeBarOpen />;
  }

  if (!data || data.error) {
    return (
      <ErrorIndicator
        message="Страница не найдена :("
        renderAction={() => (
          <Link to="/animals?limit=8">Вернуться к питомцам</Link>
        )}
      />
    );
  }

  return <AnimalDetails {...data} />;
};

const wrappedComponent = withFetchDataIndicators(
  AnimalDetailsPage,
  API.ANIMALS,
  true,
);
export { wrappedComponent as AnimalDetailsPage };
