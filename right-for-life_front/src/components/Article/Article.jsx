import React, { useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useAuthChecker } from '../../helpers/useAuthChecker';
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
import { CUDService } from '../../services/CUDService';

export const Article = ({ article }) => {
  const isAuth = useAuthChecker();
  const history = useHistory();
  const { pathname } = useLocation();
  const [state, setState] = useState({ ...article });

  const isEditModeOn = article._id === 'new';

  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [isEdit, setIsEdit] = useState(isEditModeOn);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(isEditModeOn);

  let articleType;
  if (pathname.includes('emergencies')) articleType = 'emergencies';
  else if (pathname.includes('news')) articleType = 'news';
  else if (pathname.includes('stories')) articleType = 'happyStories';

  const selectOptionChoseHandler = selectedOption => {
    switch (selectedOption) {
      case 'edit':
        setIsEditModeBarOpen(true);
        setIsEdit(true);
        break;
      case 'no-edit':
        setIsEditModeBarOpen(false);
        setIsEdit(false);
        break;
      case 'cancel-edit':
        // eslint-disable-next-line
        location.replace(location.toString().replace(/\/new$/, ''));
        break;
      case 'delete':
        CUDService.DELETE(`/${articleType}/${state._id}`).then(() =>
          history.goBack(),
        );
        break;
      case 'save':
        (() => {
          if (state._id === 'new') {
            CUDService.POST(`/${articleType}`, state).then(() =>
              history.goBack(),
            );
          } else {
            const url = `/${articleType}/${state._id}`;
            CUDService.PUT(url, state);
          }
          selectOptionChoseHandler('no-edit');
        })();
        break;
      case 'pinToHomePage':
        switch (articleType) {
          case 'emergencies': {
            CUDService.PUT('/home/pin-emergencies', { _id: state._id });
            break;
          }
          case 'news': {
            CUDService.PUT('/home/pin-news', { _id: state._id });
            break;
          }
          case 'happyStories': {
            CUDService.PUT('/home/pin-happyStories', { _id: state._id });
            break;
          }
          default: {
            return null;
          }
        }
        break;
      default:
        return null;
    }
  };

  const select = isAuth && (
    <Select
      classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
      chooseOptionHandler={selectOptionChoseHandler}
      optEdit
      optDelete
      optPinToHomePage
    />
  );

  return (
    <article>
      {!isEdit && (
        <>
          <BackBtn position="left-0 ml-2 mt-6" />
          <ShareBtn position="right-0 mr-2 mt-6" />
        </>
      )}

      {isEditModeBarOpen ? (
        <EditModeBar
          data={state}
          onEdit={() => setIsEdit(!isEdit)}
          onSave={() => selectOptionChoseHandler('save')}
          onCancel={() => selectOptionChoseHandler('cancel-edit')}
        />
      ) : (
        select
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
        {!isEdit && pathname.includes('emergencies') ? (
          <DonateButton
            className="bg-yellow-300 hover:bg-yellow-400 text-yellow-700 font-bold py-2 px-4 rounded-lg outline-none"
            style={{ marginLeft: '10px' }}
          />
        ) : null}
      </div>

      <div className="mx-10 md:mx-20">
        <aside className="font-medium text-lightgray-700 text-right text-xl mb-10">
          {state.date && calcAge(state.date) ? `${calcAge(state.date)} назад` : 'сегодня'}
        </aside>
      </div>

      {isEdit ? (
        <UpdateImageGallery
          images={state.gallery}
          updateImages={gallery => setState({ ...state, gallery })}
        />
      ) : (
        state.gallery?.length > 0 && (
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

      <div
        className={`px-10 md:px-20 rounded-lg ${
          isEdit ? 'py-10 bg-orange-100' : ''
        }`}
      >
        {isEdit ? (
          <EditVideosList
            videosList={state.videos}
            videosListChangeHandler={videos => setState({ ...state, videos })}
          />
        ) : (
          state.videos?.length > 0 &&
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
