import React from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../rootConstants';
import { AnimalDetails } from './AnimalDetails';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import './style.css';

const AnimalDetailsPage = ({ match, data: {docs: animals} }) => {
  const isEdit = true;
  const petId = match.params.id;

  if (isEdit && petId === 'new') {
    return (
      <AnimalDetails isEdit isEditModeBarOpen  />
    )
  }
  else {
    const petObj = animals.find(animal => String(animal._id) === petId);
    return petObj
      ? <AnimalDetails {...petObj} />
      : <ErrorIndicator
        message="Страница не найдена :("
        renderAction={() => <Link to="/animals">Вернуться на главную</Link>}
      />
  }
};

const wrappedComponent = withFetchDataIndicators(
  AnimalDetailsPage,
  API.ANIMALS,
);
export { wrappedComponent as AnimalDetailsPage };
