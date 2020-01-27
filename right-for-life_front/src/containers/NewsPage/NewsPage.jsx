import React from "react";
import {Link, useParams} from "react-router-dom";
import {withFetchDataIndicators} from "../../hoc/withFetchDataIndicators";
import {Article} from "../../components/Article";
import {ErrorIndicator} from "../../components/ErrorIndicator";

const NewsPage = ({data}) => {
  let {id} = useParams();
  const article = data.find(article => article.id === Number(id));
  if (!article)
    return <ErrorIndicator
      message="Страница не найдена :("
      renderAction={() => <Link to="/">Вернуться на главную</Link>}
    />;
  return (
    <div className="flex flex-wrap justify-center">
      <Article article={article}/>
    </div>
  );
};

const dataApi = 'https://raw.githubusercontent.com/protonaby/demo3-animal-shelter/master/db/news.json';
const wrappedComponent = withFetchDataIndicators(NewsPage, dataApi);

export {wrappedComponent as NewsPage};
