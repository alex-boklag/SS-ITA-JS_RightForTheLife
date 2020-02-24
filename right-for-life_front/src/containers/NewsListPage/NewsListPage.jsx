import React from 'react';
import { API } from '../../rootConstants';
import { ArticlesList } from '../../components/ArticlesList';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { withPagination } from '../../hoc/withPagination';

const NewsListPage = ({ data }) => {
  return <ArticlesList articles={data} listTitle="Новости" />;
};

const wrappedComponent = withFetchDataIndicators(
  withPagination(NewsListPage),
  API.NEWS,
  true,
);

export { wrappedComponent as NewsListPage };
