import React from 'react';
import { Link } from 'react-router-dom';
import { DonateButton } from '../DonateButton';

export const ArticlesListWidget = ({ emergency, news, happyStories }) => (
  <article className="h-full w-full flex flex-wrap flex-row lg:flex-col rounded-xl font-bold text-lightgray-700">
    {emergency && (
      <ArticlesListWidgetItem data={emergency} color="red" url="emergencies" />
    )}
    <ArticlesListWidgetItem
      color="green"
      url="help"
      data={{
        photo: 'https://i.ibb.co/bsf0vCQ/43525-799.jpg',
        title: 'ПОМОЩЬ ФОНДУ',
      }}
    />
    {happyStories && (
      <ArticlesListWidgetItem data={happyStories} url="stories" />
    )}
    {news && <ArticlesListWidgetItem data={news} url="news" />}
    <div className="min-w-full flex justify-center">
      <DonateButton className="relative z-10 w-full mx-20 py-2 rounded-lg text-lg text-lg text-center text-yellow-700 bg-yellow-300 hover:bg-yellow-400" />
    </div>
  </article>
);

const ArticlesListWidgetItem = ({ data, color, url }) => {
  const { _id, title, photo } = data;

  return (
    <Link
      to={`${_id ? `/${url}/${_id}` : `/${url}`}`}
      className="block w-full mb-20"
    >
      <section className="h-48 lg:h-30 rounded-xl shadow-2xl">
        <img
          className={`block w-full h-48 lg:h-30 object-cover rounded-xl border-4 border-white ${
            color ? `border-4 border-${color}-300` : ''
          }`}
          src={photo}
          alt={title}
        />
        <div
          className={`relative z-10 h-full max-h-16 flex items-center -mt-5 mx-3 p-2 px-5 bg-white rounded-xl shadow-2xl-light ${
            color ? `bg-${color}-300 text-${color}-700` : ''
          }`}
        >
          <h3 className="uppercase">
            {title.length > 65 ? `${title.slice(0, 65)}...` : title}
          </h3>
        </div>
      </section>
    </Link>
  );
};
