import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.querySelector('#root'));

export const EditModeBarDialog = ({ message, onTrue, onFalse }) => {
  const style = {
    overlay: {
      zIndex: 50,
      overflow: 'hidden',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '2rem',
      width: '30%',
      minWidth: '19rem',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '1rem',
      backgroundColor: 'rgba(198, 246, 213, 1)',
    },
  };

  return (
    <Modal isOpen style={style}>
      <p className="mt-1 font-bold text-center text-green-800 uppercase">
        {message}
      </p>
      <div className="flex justify-center">
        <button
          className="mx-2 mt-6 w-24 py-2 rounded-lg font-bold text-green-800 bg-green-300 hover:bg-green-400 uppercase focus:outline-none"
          onClick={onTrue}
        >
          Да
        </button>
        <button
          className="mx-2 mt-6 w-24 py-2 rounded-lg font-bold text-green-800 bg-green-300 hover:bg-green-400 uppercase focus:outline-none"
          onClick={onFalse}
        >
          Нет
        </button>
      </div>
    </Modal>
  );
};
