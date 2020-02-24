import React from 'react';
import { API } from '../../rootConstants';
import { withPagination } from '../../hoc/withPagination';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { ArticlesList } from '../../components/ArticlesList';

const ReportsPage = ({ data }) => {
  const reports = data || [];
  reports.forEach(item => {
    item.photo = item.gallery[0];
  });
  return <ArticlesList articles={reports} listTitle="Финансовые отчеты" />;
};

const wrappedComponent = withFetchDataIndicators(
  withPagination(ReportsPage),
  API.REPORTS,
  true,
);

export { wrappedComponent as ReportsPage };
