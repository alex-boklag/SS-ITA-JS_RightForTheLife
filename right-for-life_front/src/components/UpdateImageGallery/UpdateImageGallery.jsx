import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { UploadImages } from '../../services/UploadImages';
import './UpdateImageGallery.css';

export const UpdateImageGallery = ({ images, updateImages }) => {
  const [isUpload, setIsUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();

  return (
    <article className="-mx-2 my-10 p-1 rounded-lg border border-orange-200 bg-orange-100">
      <section className="relative flex flex-wrap">
        {isUpload && (
          <div className="absolute inset-0 w-full h-full p-1 z-10">
            <span className="flex justify-center items-center w-full h-full rounded-lg font-bold text-orange-700 bg-orange-100 opacity-75">
              <div className="loader loader-3">
                <div className="dot dot1" style={{ background: '#c05621' }} />
                <div className="dot dot2" style={{ background: '#c05621' }} />
                <div className="dot dot3" style={{ background: '#c05621' }} />
              </div>
            </span>
          </div>
        )}
        {images.length > 0 ? (
          images.map((image, idx) => (
            <div key={idx} className="relative w-1/2 h-48 md:w-1/3 p-1">
              <img
                src={image}
                className="w-full h-full object-cover rounded-lg overflow-hidden"
                alt=""
              />
              <div className="absolute inset-0 w-full h-full p-1">
                <button
                  className="uig-delete w-full h-full hover:bg-orange-100 opacity-75"
                  onClick={() => {
                    updateImages([
                      ...images.slice(0, idx),
                      ...images.slice(idx + 1),
                    ]);
                  }}
                >
                  <i className="fas fa-times text-4xl text-orange-700 invisible" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-12 w-full">
            <p className="font-bold text-sm text-orange-700 uppercase opacity-25">
              На этой странице нет изображений
            </p>
          </div>
        )}
      </section>
      <section className="relative w-full h-14 p-1">
        {isUpload && (
          <div
            className="absolute top-0 left-0 bottom-0 p-1"
            style={{ width: `${progress}%`, transition: '300ms' }}
          >
            <div className="flex justify-center items-center w-full h-full rounded-lg bg-orange-300">
              {isUpload && progress > 0 && (
                <span className="font-bold text-orange-700">{progress}%</span>
              )}
            </div>
          </div>
        )}
        <label
          htmlFor="upload-image"
          className={`flex justify-center items-center w-full h-full rounded-lg font-bold text-orange-700 bg-orange-200 ${
            !isUpload ? 'hover:bg-orange-300 cursor-pointer' : ''
          }`}
        >
          {!isUpload && (
            <>
              <i className="fas fa-cloud-upload-alt px-2 text-lg" />
              <span className="text-sm uppercase">Загрузить изображения</span>
            </>
          )}
          <input
            id="upload-image"
            disabled={isUpload}
            onChange={() => {
              setIsUpload(true);

              UploadImages(inputRef.current.files, setProgress).then(links => {
                updateImages([...images, ...links]);
                setProgress(0);
                setIsUpload(false);
                inputRef.current.value = '';
              });
            }}
            ref={inputRef}
            className="hidden"
            type="file"
            accept="image/*"
            multiple
          />
        </label>
      </section>
    </article>
  );
};

UpdateImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateImages: PropTypes.func.isRequired,
};
