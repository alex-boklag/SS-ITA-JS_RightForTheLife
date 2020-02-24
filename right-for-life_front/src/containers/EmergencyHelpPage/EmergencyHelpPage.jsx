import React from 'react';
import { API } from '../../rootConstants';
import { ArticlesList } from '../../components/ArticlesList';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { withPagination } from '../../hoc/withPagination';

const EmergencyHelpPage = ({ data }) => (
  <ArticlesList articles={data} listTitle="Cрочники" />
);

const wrappedComponent = withFetchDataIndicators(
  withPagination(EmergencyHelpPage),
  API.EMERGENCY_HELP,
  true,
);

export { wrappedComponent as EmergencyHelpPage };
