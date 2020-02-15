import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { useLocation } from 'react-router-dom';
import calcAge from '../../helpers/calcAge';
import { BackBtn, ShareBtn } from '../FloatingBtn';
import { ArticleImageGallery } from '../ArticleImageGallery';
import { DonateButton } from '../DonateButton';
import { EditArticleFeaturedImage } from '../EditArticleFeaturedImage';
import { EditVideosList } from '../EditVideosList';
import { UpdateImageGallery } from '../UpdateImageGallery';
import { extractVideoIdFromYouTubeLink } from '../../helpers/extractVideoIdFromYouTubeLink';
import { EditModeBar } from '../EditModeBar';

import './style.css';
import { Select } from '../Select';

export const Article = ({ article }) => {
  const { pathname: currentURL } = useLocation();
  article.gallery = [];
  article.videos = [];
  const [state, setState] = useState(article);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(false);

  const selectOptionChoseHandler = selectedOption => {
    switch (selectedOption) {
      case 'edit':
        setIsEditModeBarOpen(true);
        setIsEdit(true);
        break;

      default:
        return null;
    }
    return null;
  };

  return (
    <article>
      <BackBtn position="left-0 ml-2 mt-6" />
      <ShareBtn position="right-0 mr-2 mt-6" />

      {isEditModeBarOpen ? (
        <EditModeBar
          isOpen={isEditModeBarOpen}
          onEdit={() => setIsEdit(!isEdit)}
          state={state}
        />
      ) : (
        <Select
          classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
          chooseOptionHandler={selectOptionChoseHandler}
          optEdit
          optDelete
          optPinToHomePage
        />
      )}

      {isEdit ? (
        <EditArticleFeaturedImage
          image={state.photo}
          imageChangeHandler={photo => setState({ ...state, photo })}
        />
      ) : (
        <div
          className="h-78 rounded-b-xl bg-cover shadow-md bg-center"
          style={{ backgroundImage: `url(${state.photo})` }}
        />
      )}

      <div
        className={`uppercase font-extrabold text-xl z-20 relative bg-white text-lightgray-700 shadow-xl rounded-xl -mt-10 px-8 flex items-center mx-8 mb-10 justify-between ${
          isEdit ? 'bg-orange-200' : ''
        }`}
        style={{ minHeight: '100px' }}
      >
        <div
          className="flex-grow"
          ref={titleRef}
          contentEditable={isEdit}
          suppressContentEditableWarning
          onBlur={() =>
            setState({ ...state, title: titleRef.current.textContent })
          }
        >
          {state.title}
        </div>
        {currentURL.includes('emergency') ? (
          <DonateButton style={{ marginLeft: '10px' }} />
        ) : null}
      </div>

      <div className="mx-10 md:mx-20">
        <aside className="font-medium text-lightgray-700 text-right text-xl mb-10">
          {calcAge(Number(state.date))} назад
        </aside>
      </div>

      {isEdit ? (
        <UpdateImageGallery
          images={state.gallery}
          updateImages={gallery => setState({ ...state, gallery })}
        />
      ) : (
        state.gallery.length > 0 && (
          <div className="mb-10 md:mx-20">
            <ArticleImageGallery images={state.gallery} />
          </div>
        )
      )}

      <div>
        <p
          className={`px-10 md:px-20 font-medium text-lightgray-600 rounded-lg mb-12 ${
            isEdit ? 'py-10 bg-orange-100' : ''
          }`}
          style={{ whiteSpace: 'pre-wrap' }}
          ref={textRef}
          contentEditable={isEdit}
          suppressContentEditableWarning
          onBlur={() => {
            setState({ ...state, text: textRef.current.innerText });
          }}
        >
          {state.text}
        </p>
      </div>

      <div className={`px-10 md:px-20 ${isEdit ? 'py-10 bg-orange-100' : ''}`}>
        {isEdit ? (
          <EditVideosList
            videosList={state.videos}
            videosListChangeHandler={videos => setState({ ...state, videos })}
          />
        ) : (
          state.videos?.length &&
          state.videos.map(video => (
            <div className="video-iframe-container" key={video}>
              <YouTube videoId={extractVideoIdFromYouTubeLink(video)} />
            </div>
          ))
        )}
      </div>
    </article>
  );
};
