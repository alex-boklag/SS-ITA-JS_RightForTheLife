import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { UploadImages } from '../../services/UploadImages';

export const EditArticleFeaturedImage = ({ image, imageChangeHandler }) => {
  const [isUpload, setIsUpload] = useState(false);
  const inputRef = useRef();

  return (
    <div
      className="relative h-78 rounded-b-xl bg-cover shadow-md bg-center overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="eafi-update absolute inset-0 w-full h-full z-10 bg-orange-100 hover:bg-orange-200 opacity-75">
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={() => {
            setIsUpload(true);
            UploadImages(inputRef.current.files).then(links => {
              imageChangeHandler(links[0]);
              setIsUpload(false);
            });
          }}
        />
        {!isUpload ? (
          <label
            htmlFor="imageInput"
            className="flex justify-center items-center w-full h-full font-bold uppercase text-xl text-orange-700 cursor-pointer"
          >
            {image ? (
              <span>
                <i className="fas fa-sync-alt px-3" />
                Изменить изображение
              </span>
            ) : (
              <span>
                <i className="fas fa-cloud-upload-alt px-3" />
                Установить изображение
              </span>
            )}
          </label>
        ) : (
          <div className="flex justify-center items-center w-full h-full font-bold uppercase text-xl text-orange-700">
            <div className="loader loader-3">
              <div className="dot dot1" style={{ background: '#c05621' }} />
              <div className="dot dot2" style={{ background: '#c05621' }} />
              <div className="dot dot3" style={{ background: '#c05621' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

EditArticleFeaturedImage.propTypes = {
  image: PropTypes.string.isRequired,
  imageChangeHandler: PropTypes.func.isRequired,
};
