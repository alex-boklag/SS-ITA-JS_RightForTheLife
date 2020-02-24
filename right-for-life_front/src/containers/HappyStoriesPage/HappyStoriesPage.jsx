import React from 'react';
import { API } from '../../rootConstants';
import { ArticlesList } from '../../components/ArticlesList';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { withPagination } from '../../hoc/withPagination';

const HappyStoriesPage = ({ data }) => {
  return <ArticlesList articles={data} listTitle="Cчастливые истории" />;
};

const wrappedComponent = withFetchDataIndicators(
  withPagination(HappyStoriesPage, 10),
  API.HAPPY_STORIES,
  true,
);

export { wrappedComponent as HappyStoriesPage };
