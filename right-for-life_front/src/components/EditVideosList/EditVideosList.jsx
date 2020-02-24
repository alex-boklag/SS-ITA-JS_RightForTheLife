import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

export const EditVideosList = ({
  className,
  videosList,
  videosListChangeHandler,
}) => {
  const [videos, setVideos] = useState(videosList);

  const formik = useFormik({
    initialValues: { youTubeVideoLink: '' },
    onSubmit: (values, formikBag) => {
      formikBag.resetForm();
      const newVideosList = [...videos, values.youTubeVideoLink];
      videosListChangeHandler(newVideosList);
      setVideos(newVideosList);
    },
    validate: values => {
      const errors = {};
      if (!values.youTubeVideoLink)
        errors.youTubeVideoLink = 'Заполните это поле';
      else if (!/.*(watch\?v=|tu\.be\/)/.test(values.youTubeVideoLink))
        errors.youTubeVideoLink = 'Введите правильную ссылку на видео Youtube';
      return errors;
    },
  });

  return (
    <div className={className}>
      <ul className="mb-4">
        {videos.length ? (
          videos.map((video, i) => {
            return (
              <li key={i} className="mb-2">
                <a
                  href={video}
                  className="text-teal-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video}
                </a>
                <button
                  className="block text-sm text-orange-700 hover:underline cursor-pointer"
                  onClick={() => {
                    const newVideosList = [
                      ...videos.slice(0, i),
                      ...videos.slice(i + 1),
                    ];
                    videosListChangeHandler(newVideosList);
                    setVideos(newVideosList);
                  }}
                >
                  Удалить видео
                </button>
              </li>
            );
          })
        ) : (
          <div className="ml-2 mb-4 text-center text-xl font-bold text-lightgray-600">
            На этой странице нет видео
          </div>
        )}
      </ul>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="youTubeVideoLink"
          className="block ml-2 text-lightgray-600"
        >
          <input
            id="youTubeVideoLink"
            className="block w-full rounded-full h-10 px-4 text-lg font-medium focus:outline-none mb-1 text-lightgray-600"
            {...formik.getFieldProps('youTubeVideoLink')}
          />
          Ссылка на видео с YouTube:
        </label>
        <div className="ml-2 text-xs text-red-600 h-1">
          {formik.touched.youTubeVideoLink && formik.errors.youTubeVideoLink
            ? formik.errors.youTubeVideoLink
            : null}
        </div>
        <button
          type="submit"
          className="bg-orange-300 hover:bg-orange-400 text-orange-700 font-bold px-4 py-2 rounded-lg focus:outline-none block ml-auto"
        >
          Добавить видео
        </button>
      </form>
    </div>
  );
};

EditVideosList.propTypes = {
  className: PropTypes.string,
  videosList: PropTypes.array,
  videosListChangeHandler: PropTypes.func.isRequired,
};

EditVideosList.defaultProps = {
  className: '',
  videosList: [],
};
