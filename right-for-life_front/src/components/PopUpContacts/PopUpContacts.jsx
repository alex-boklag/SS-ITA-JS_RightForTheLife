import React from 'react';
import Modal from 'react-modal';
import { ViberIcon, TelegramIcon, FacebookIcon } from "react-share";

Modal.setAppElement(document.querySelector('#root'));

export const PopUpContacts = ({ handleShowingModal }) => {
  const style = {
    overlay: {
      zIndex: 50,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '2rem',
      width: '60%',
      minWidth: '24rem',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1rem',
    }
  };

  return (
    <Modal isOpen style={style}>
      <section className="flex justify-between items-center">
        <p className="text-4xl font-bold">Свяжитесь с нами</p>
        <div className="modal-close cursor-pointer self-start" onClick={handleShowingModal}>
          <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
      </section>
      <section className="text-3xl my-8">
        <span>Чтобы приютить питомца, пожалуйста, свяжитесь с координатором Ольгой</span>
      </section>
      <section className="flex justify-center outline-none">
        <a href="tel:0932350370" className="flex flex-row items-center mx-2 px-3 bg-green-600 rounded-full ">
          <i className={`fas fa-phone-alt fa-3x text-white`}></i>
        </a>
        <a href="viber://chat?number=0932350370">
          <ViberIcon className="mx-2 cursor-pointer" size={75} round={true} />
        </a>
        <a href="https://web.telegram.org/#/im?p=u737945099_1624124500386583069" target="_blank" rel="noopener noreferrer">
          <TelegramIcon className="mx-2 cursor-pointer" size={75} round={true} />
        </a>
        <a href="https://m.me/2943840722507275" target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="mx-2 cursor-pointer" size={75} round={true} />
        </a>
      </section>
    </Modal>
  );
}