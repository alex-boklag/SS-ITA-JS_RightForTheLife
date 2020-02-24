import React from 'react';

export class GalleryLayout extends React.Component {
  shouldComponentUpdate() {
    // false because it non react code
    return false;
  }

  render() {
    return (
      <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" key="1" />
            <div className="pswp__item" key="2" />
            <div className="pswp__item" key="3" />
          </div>

          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />

              <div
                className="pswp__button pswp__button--close"
                title="Закрыть (Esc)"
              />
              <div className="pswp__button pswp__button--share" title="" />
              <div className="pswp__button pswp__button--fs" title="" />
              <div className="pswp__button pswp__button--zoom" title="" />

              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>

            <div
              className="pswp__button pswp__button--arrow--left"
              title="Назад (стрелочка влево)"
            />

            <div
              className="pswp__button pswp__button--arrow--right"
              title="Вперед (стрелочка вправо)"
            />

            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
