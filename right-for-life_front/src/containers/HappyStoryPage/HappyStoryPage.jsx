import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../rootConstants';
import { Article } from '../../components/Article';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';

const HappyStoryPage = ({ data }) => {
  const { id } = useParams();
  let story = { ...data };

  if (id === 'new') {
    story = {
      _id: 'new',
      gallery: [],
      videos: [],
      date: Date.now(),
      title: 'Введите заголовок...',
      photo: '',
      text: 'Введите текст...',
    };
  }

  if (!story || story.error)
    return (
      <ErrorIndicator
        message="Страница не найдена :("
        renderAction={() => (
          <Link to="/stories">Посмотреть другие истории</Link>
        )}
      />
    );

  return (
    <div className="-mt-10 max-w-4xl mx-auto">
      <Article article={story} />
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(
  HappyStoryPage,
  API.HAPPY_STORIES,
  true,
);

export { wrappedComponent as HappyStoryPage };
