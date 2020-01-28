import React from "react";
import {ArticlesList} from "../../components/ArticlesList";
import { withFetchDataIndicators } from "../../hoc/withFetchDataIndicators";
import {NEWS} from "../../rootConstants";
import {withPagination} from "../../hoc/withPagination";

const NewsListPage = ({ data }) => {
  return (
      <ArticlesList articles={data} listTitle="Новости"/>
  );
};

const dataApi = 'https://raw.githubusercontent.com/protonaby/demo3-animal-shelter/master/db/news.json';
const wrappedComponent = withFetchDataIndicators(withPagination(NewsListPage, 10), NEWS, dataApi);

export { wrappedComponent as NewsListPage};
