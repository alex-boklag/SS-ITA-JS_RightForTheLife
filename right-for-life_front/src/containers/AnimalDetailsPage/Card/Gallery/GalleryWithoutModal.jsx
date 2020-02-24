import React from 'react';
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm';
import 'swiper/css/swiper.css';

export class GalleryWithoutModal extends React.Component {
  componentDidMount() {
    Swiper.use([Navigation, Pagination]);

    const { photos } = this.props;

    // eslint-disable-next-line no-new
    new Swiper('.swiper-container', {
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      },
      watchOverflow: true,
    });

    this.getPicturesSizes(photos).then(s => {
      this.sizesForModal = s;
      return null;
    });

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // for modal
  getThumbBoundsFn = index => {
    const imgSize = this.sizesForModal ? this.sizesForModal[index].w : 0;

    return {
      x: document.body.clientWidth / 2 - imgSize / 2,
      y: document.body.clientHeight / 2,
      w: imgSize,
    };
  };

  getPicturesSizes = srcArr => {
    const sizes = [];

    return Promise.all(
      srcArr.map(
        (src, index) =>
          new Promise(resolve => {
            const img = document.createElement('img');

            img.onload = () => {
              sizes[index] = this.getImgSize(img);
              resolve();
            };

            img.src = src;
          }),
      ),
    ).then(() => sizes);
  };

  getImgSize = img => {
    const maxImgSize = Math.max(img.height, img.width);
    const displaySize = Math.min(
      1500,
      document.body.clientWidth,
      document.body.clientHeight,
    );
    const factor = displaySize / maxImgSize;

    return {
      w: img.width * factor,
      h: img.height * factor,
    };
  };

  handleResize = () => {
    const { photos } = this.props;

    if (this.timerForSizes) {
      clearTimeout(this.timerForSizes);
    }

    // timer to skip unnecessary starts
    this.timerForSizes = setTimeout(() => {
      this.getPicturesSizes(photos).then(s => {
        this.sizesForModal = s;
      });
    }, 400);
  };

  render() {
    const { photos, onClick } = this.props;

    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {photos.map((src, index) => (
            <div className="swiper-slide" key={src}>
              <img // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                src={src}
                onDragStart={e => e.preventDefault()}
                alt="Фото питомца"
                className="object-cover w-full cursor-pointer"
                onClick={
                  onClick
                    ? () =>
                        onClick({
                          index,
                          getThumbBoundsFn: () => this.getThumbBoundsFn(index),
                          sizes: this.sizesForModal,
                        })
                    : null
                }
              />
            </div>
          ))}
        </div>

        <div className="swiper-pagination" />

        {[false, true].map(isRight => (
          <div
            key={isRight ? 'r' : 'l'}
            className={`hidden lg:flex z-10 swiper-button-${
              isRight ? 'next' : 'prev'
            }-custom cursor-pointer align-middle justify-center text-white text-2xl h-full w-10 absolute top-0 opacity-75
             ${isRight ? 'right-0' : ''}`}
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <i
              className={`fas fa-chevron-${isRight ? 'right' : 'left'} m-auto`}
            />
          </div>
        ))}
      </div>
    );
  }
}
