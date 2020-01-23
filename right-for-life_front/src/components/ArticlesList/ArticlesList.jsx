import React from "react";
import {ArticleItem} from "../ArticleItem";

export const ArticlesList = ({articles, listTitle}) => {
  return (
    <div>
      <h1 className="ml-40 my-6 font-bold text-lightgray-700 text-4xl uppercase">{listTitle}</h1>
      <div className="flex flex-wrap justify-center">
        {articles.map(article => {
          return <ArticleItem key={article.id} article={article}/>;
        })}
      </div>
    </div>
  );
};
