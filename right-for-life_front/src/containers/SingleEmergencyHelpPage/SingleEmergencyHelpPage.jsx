import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Article } from '../../components/Article';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { API } from '../../rootConstants';

const SingleEmergencyHelpPage = ({ data }) => {
  const { id } = useParams();
  let emergency = { ...data };

  if (id === 'new') {
    emergency = {
      _id: 'new',
      gallery: [],
      videos: [],
      date: Date.now(),
      title: 'Введите заголовок...',
      photo: '',
      text: 'Введите текст...',
    };
  }

  if (!emergency || emergency.error)
    return (
      <ErrorIndicator
        message="Страница не найдена :("
        renderAction={() => (
          <Link to="/emergencies">Вернуться на страницу срочной помощи</Link>
        )}
      />
    );

  return (
    <div className="-mt-10 max-w-4xl mx-auto">
      <Article article={emergency} />
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(
  SingleEmergencyHelpPage,
  API.EMERGENCY_HELP,
  true,
);

export { wrappedComponent as SingleEmergencyHelpPage };
