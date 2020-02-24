import React, { useState } from 'react';
import { useAuthChecker } from '../../helpers/useAuthChecker';
import { API } from '../../rootConstants';
import { CUDService } from '../../services/CUDService';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { ImageCarousel } from '../../components/ImageCarousel';
import { HomeArticle } from '../../components/HomeArticle';
import { ArticlesListWidget } from '../../components/ArticlesListWidget';
import { EditModeBar } from '../../components/EditModeBar';
import { Select } from '../../components/Select';
import { UpdateImageGallery } from '../../components/UpdateImageGallery';

const HomePage = ({ data }) => {
  const isAuth = useAuthChecker();
  const [state, setState] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(false);

  const selectOptionChoseHandler = selectedOption => {
    if (selectedOption === 'edit') {
      setIsEditModeBarOpen(true);
      setIsEdit(true);
    }

    if (selectedOption === 'no-edit') {
      setIsEditModeBarOpen(false);
      setIsEdit(false);
    }
  };

  const setTitle = title => setState({ ...state, title });
  const setDescription = description => setState({ ...state, description });

  const select = isAuth && (
    <Select
      classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
      chooseOptionHandler={selectOptionChoseHandler}
      optEdit
    />
  );

  const imageCarousel = state.gallery?.length && (
    <ImageCarousel data={state.gallery} />
  );

  return (
    <article className="flex flex-col lg:flex-row flex-1 pb-8">
      {isEditModeBarOpen ? (
        <EditModeBar
          data={state}
          onEdit={() => setIsEdit(!isEdit)}
          onSave={() => {
            CUDService.PUT('/home', state);
            selectOptionChoseHandler('no-edit');
          }}
          onCancel={() => {
            window.location.reload();
          }}
        />
      ) : (
        select
      )}
      <section className="w-full lg:w-2/3 p-5">
        {!isEdit ? (
          imageCarousel
        ) : (
          <div className="-mt-10">
            <UpdateImageGallery
              images={state.gallery}
              updateImages={gallery => setState({ ...state, gallery })}
            />
          </div>
        )}
        <HomeArticle
          title={state.title}
          description={state.description}
          setTitle={setTitle}
          setDescription={setDescription}
          isEdit={isEdit}
        />
      </section>
      <section className="w-full lg:w-1/3 lg:h-auto p-5">
        <ArticlesListWidget
          emergency={state.emergencies}
          news={state.news}
          happyStories={state.happyStories}
        />
      </section>
    </article>
  );
};

const wrappedComponent = withFetchDataIndicators(HomePage, API.HOME, true);

export { wrappedComponent as HomePage };
