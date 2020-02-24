import React from 'react';
import { useAuthChecker } from '../../helpers/useAuthChecker';
import { ArticleItem } from '../ArticleItem';
import { Select } from '../Select';
import { ErrorIndicator } from '../ErrorIndicator';

export const ArticlesList = ({ articles, listTitle }) => {
  const isAuth = useAuthChecker();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center">
        <h1 className="font-bold text-lightgray-700 text-4xl uppercase">
          {listTitle}
        </h1>
        {isAuth ? <Select optAdd classNames="ml-4" /> : null}
      </div>
      <div className="flex flex-wrap justify-center -mx-4 flex-grow">
        {articles?.length ? (
          articles.map(article => {
            return <ArticleItem key={article._id} article={article} />;
          })
        ) : (
          <div>
            <ErrorIndicator message="Здесь пока ничего нет!" />
          </div>
        )}
      </div>
    </div>
  );
};
