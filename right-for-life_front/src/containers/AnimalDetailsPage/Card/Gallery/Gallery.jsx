import React from 'react';
import { GalleryWithoutModal } from './GalleryWithoutModal';
import { Modal } from './Modal';

export class Gallery extends React.Component {
  modal = React.createRef();

  render() {
    const { photos } = this.props;

    return (
      <>
        <GalleryWithoutModal
          photos={photos}
          onClick={i => this.modal.current.init(i)}
        />
        <Modal ref={this.modal} photos={photos} />
      </>
    );
  }
}
