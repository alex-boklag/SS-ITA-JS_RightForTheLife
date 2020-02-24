import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { Article } from '../../components/Article';

const NewsPage = ({ data }) => {
  const { id } = useParams();
  let news = { ...data };

  if (id === 'new') {
    news = {
      _id: 'new',
      gallery: [],
      videos: [],
      date: Date.now(),
      title: 'Введите заголовок новости...',
      photo: '',
      text: 'Введите текст новости...',
    };
  }

  if (!news || news.error)
    return (
      <ErrorIndicator
        message="Страница не найдена :("
        renderAction={() => <Link to="/news">Вернуться к новостям</Link>}
      />
    );

  return (
    <div className="-mt-6 lg:-mt-8 max-w-4xl mx-auto">
      <Article article={news} />
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(NewsPage, API.NEWS, true);

export { wrappedComponent as NewsPage };
