import React, { useReducer } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

import './style.css';

export const ArticleImageGallery = ({ images }) => {
  const newImages = [...images].map(image => ({ src: image }));

  const galleryInitialState = {
    isModalOpen: false,
    selectedImage: 0,
  };

  const galleryReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_LIGHTBOX':
        return {
          isModalOpen: !state.isModalOpen,
          selectedImage: action.selectedImage || 0,
        };
      default:
        return state;
    }
  };

  const [galleryState, galleryDispatch] = useReducer(
    galleryReducer,
    galleryInitialState,
  );

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        {newImages.map((image, i) => (
          <div className="w-1/2 md:w-1/3 p-1" key={i}>
            <button
              onClick={() =>
                galleryDispatch({ type: 'TOGGLE_LIGHTBOX', selectedImage: i })
              }
            >
              <img
                src={image.src}
                alt=""
                className="object-cover h-40 md:h-48 w-full cursor-pointer hover:opacity-75"
              />
            </button>
          </div>
        ))}
      </div>
      <ModalGateway>
        {galleryState.isModalOpen && (
          <Modal
            onClose={() => galleryDispatch({ type: 'TOGGLE_LIGHTBOX' })}
            allowFullscreen={false}
          >
            <Carousel
              views={newImages}
              currentIndex={galleryState.selectedImage}
              styles={{
                view: base => ({
                  ...base,

                  '& > img': {
                    display: 'inline',
                  },
                }),
              }}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  );
};
