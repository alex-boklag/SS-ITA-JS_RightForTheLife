import React, { useState, useEffect, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { PopUpContacts } from '../../../components/PopUpContacts';
import calcAge from '../../../helpers/calcAge';
import { Gallery } from './Gallery';
import './style.css';

const renderCardContentForEdit = ({
  name,
  type,
  gender,
  age,
  updateName,
  updateType,
  updateGender,
  updateAge,
  nameRef,
  typeRef,
  genderRef,
}) => {
  return (
    <li className="animal-details-card w-full flex flex-col">
      <div className="w-11/12 p-4 bg-white text-center text-gray-700 uppercase shadow-xl rounded-b-xl self-center">
        <p
          className="font-bold text-lg outline-none px-2 bg-orange-200"
          contentEditable
          suppressContentEditableWarning
          ref={nameRef}
          onBlur={() => updateName(nameRef.current.innerText)}
        >
          {name}
        </p>
        <div className="flex justify-around items-center my-4">
          <select
            ref={typeRef}
            className="appearance-none bg-white border border-orange-300 hover:border-orange-400 px-4 py-2 rounded shadow leading-tight outline-none cursor-pointer"
            onChange={() => updateType(typeRef.current.value)}
          >
            {type === 'кот' ? (
              <>
                <option value="кот" selected>
                  Кот
                </option>
                <option value="пес">Пес</option>
              </>
            ) : (
              <>
                <option value="кот">Кот</option>
                <option value="пес" selected>
                  Пес
                </option>
              </>
            )}
          </select>
          <select
            ref={genderRef}
            className="appearance-none bg-white border border-orange-300 hover:border-orange-400 px-4 py-2 rounded shadow leading-tight outline-none cursor-pointer"
            onChange={() => updateGender(genderRef.current.value)}
          >
            {gender === 'М' ? (
              <>
                <option value="М" selected>
                  Мальчик
                </option>
                <option value="Ж">Девочка</option>
              </>
            ) : (
              <>
                <option value="М">Мальчик</option>
                <option value="Ж" selected>
                  Девочка
                </option>
              </>
            )}
          </select>
        </div>
        <DayPickerInput
          value={new Date(age)}
          onDayChange={day => updateAge(Date.parse(day))}
        />
      </div>
    </li>
  );
};

const renderCardContent = ({ name, gender, age, photos, showModal }) => {
  return (
    <li className="animal-details-card w-full flex flex-col">
      <div className="pointer">
        <div className="rounded-b-xl sm:rounded-xl overflow-hidden shadow-lg z-0 relative -mx-3 sm:mx-0">
          <Gallery photos={photos} />
        </div>
      </div>
      <div className="w-11/12 p-4 bg-white text-gray-700 uppercase shadow-xl rounded-b-xl self-center">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg outline-none">{name}</p>
          <p className="text-2xl">
            {gender === 'М' ? (
              <i className="fas fa-mars" />
            ) : (
              <i className="fas fa-venus" />
            )}
          </p>
        </div>
        <p className="text-sm font-medium">{calcAge(age)}</p>
        <button
          onClick={showModal}
          className="animal-details__btn w-full font-bold py-2 px-2 rounded-lg mt-2 focus:outline-none bg-gray-300 hover:bg-gray-400 text-gray-700"
        >
          Приютить
        </button>
      </div>
    </li>
  );
};

export const Card = props => {
  const nameRef = useRef();
  const typeRef = useRef();
  const genderRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = () => {
    window.history.pushState(null, null, '#');
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    window.addEventListener('popstate', closeModal);
    return () => {
      window.removeEventListener('popstate', closeModal);
    };
  });

  const { isEdit } = props;

  return (
    <>
      {modalIsOpen && (
        <PopUpContacts handleShowingModal={() => window.history.back()} />
      )}
      {isEdit
        ? renderCardContentForEdit({ ...props, nameRef, typeRef, genderRef })
        : renderCardContent({ ...props, showModal })}
    </>
  );
};
