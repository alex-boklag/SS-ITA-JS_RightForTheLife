import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DonateButton } from '../DonateButton';

export const ArticleItem = ({ article }) => {
  const { title, date, photo, text, _id } = article;
  const { pathname: currentURL } = useLocation();

  return (
    <article className="px-4 pb-16 flex flex-col w-full md:w-1/2">
      <div
        className="h-64 rounded-xl bg-cover shadow-md bg-center"
        style={{ backgroundImage: `url(${photo})` }}
      />
      <div
        className={`z-0 w-19/20 bg-white text-lightgray-700 shadow-xl rounded-xl self-center -mt-10 px-5 pt-5 pb-20 overflow-hidden relative ${
          text?.length > 0 ? 'xl:h-56' : ''
        }`}
      >
        <p className="font-medium mb-2">
          {new Date(Number(date)).toLocaleDateString()}
        </p>
        <h2 className="uppercase mb-2 font-bold">
          {title.slice(0, 80)}
          {title.length >= 80 && '...'}
        </h2>
        {text?.length > 0 && (
          <p className="mt-b font-size-sm">{text.slice(0, 120)}...</p>
        )}
        {currentURL === '/emergencies' && (
          <DonateButton
            className="bg-yellow-300 hover:bg-yellow-400 text-yellow-700 font-bold py-2 px-4 rounded-lg outline-none absolute"
            style={{ bottom: '20px', right: '150px' }}
          />
        )}
        <Link
          to={`${currentURL}/${_id}`}
          className="bg-orange-200 hover:bg-orange-300 text-orange-700 font-bold py-2 px-4 rounded-lg outline-none absolute"
          style={{ bottom: '20px', right: '20px' }}
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
};
