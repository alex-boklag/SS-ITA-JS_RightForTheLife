import React, { useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuthChecker } from '../../helpers/useAuthChecker';
import { Card } from './Card';
import { BackBtn, ShareBtn } from '../../components/FloatingBtn';
import { ShareMobile } from './ShareMobile';
import { UpdateImageGallery } from '../../components/UpdateImageGallery';
import { EditModeBar } from '../../components/EditModeBar';
import { Select } from '../../components/Select';
import { CUDService } from '../../services/CUDService';
import './style.css';

export const AnimalDetails = ({
  isEdit: isEditProp,
  isEditModeBarOpen: isEditModeBarOpenProp,
  ...rest
}) => {
  const isAuth = useAuthChecker();
  const history = useHistory();
  const { pathname } = useLocation();
  const [animal, setAnimal] = useState(rest);
  const [isEdit, setIsEdit] = useState(isEditProp);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(
    isEditModeBarOpenProp,
  );

  const descriptionRef = useRef();

  const selectOptionChoseHandler = selectedOption => {
    switch (selectedOption) {
      case 'edit':
        setIsEditModeBarOpen(true);
        setIsEdit(true);
        break;
      case 'no-edit':
        setIsEditModeBarOpen(false);
        setIsEdit(false);
        break;
      case 'cancel-edit':
        // eslint-disable-next-line
        location.replace(location.toString().replace('/new', ''));
        break;
      case 'delete':
        CUDService.DELETE(`/animals/${animal._id}`).then(() =>
          history.goBack(),
        );
        break;
      case 'save':
        (() => {
          let url;

          if (animal._id) {
            url = pathname.match('/.*/')[0] + animal._id;
            CUDService.PUT(url, animal);
          } else {
            url = pathname.match('/.*/')[0].slice(0, -1);
            CUDService.POST(url, animal).then(() => history.goBack());
          }
          selectOptionChoseHandler('no-edit');
        })();
        break;
      default:
        return null;
    }
  };

  const updateName = newName => setAnimal({ ...animal, name: newName });
  const updateType = newType => setAnimal({ ...animal, type: newType });
  const updateAge = newAge => setAnimal({ ...animal, age: newAge });
  const updateGender = newGender => setAnimal({ ...animal, gender: newGender });

  const select = isAuth && (
    <Select
      classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
      chooseOptionHandler={selectOptionChoseHandler}
      optEdit
      optDelete
    />
  );

  return (
    <div className="-mt-6 sm:mt-0">
      {!isEdit && (
        <>
          <BackBtn />
          <div className="hidden sm:block">
            <ShareBtn />
          </div>
        </>
      )}

      {isEditModeBarOpen ? (
        <EditModeBar
          data={animal}
          onEdit={() => setIsEdit(!isEdit)}
          onSave={() => selectOptionChoseHandler('save')}
          onCancel={() => selectOptionChoseHandler('cancel-edit')}
        />
      ) : (
        select
      )}

      <div
        className="flex-none sm:flex mx-auto px-0 sm:px-4"
        style={{ maxWidth: '800px' }}
      >
        <div className="w-full sm:w-1/2">
          {isEdit ? (
            <Card
              {...animal}
              updateName={updateName}
              updateType={updateType}
              updateGender={updateGender}
              updateAge={updateAge}
              isEdit
            />
          ) : (
            <Card {...animal} isEdit={false} />
          )}
          {isEdit && (
            <UpdateImageGallery
              images={animal.photos}
              updateImages={photos => setAnimal({ ...animal, photos })}
            />
          )}
        </div>

        {!isEdit && <ShareMobile className="mt-8 -mb-6" />}

        <div
          contentEditable={isEdit}
          suppressContentEditableWarning
          ref={descriptionRef}
          onBlur={() =>
            setAnimal({
              ...animal,
              description: descriptionRef.current.textContent,
            })
          }
          className={`w-full sm:w-1/2 mt-10 sm:mt-5 mb-5 mx-0 sm:ml-12 sm:mr-12 md:mr-8 lg:mr-0 font-medium 
            text-gray-700 border-8 border-transparent ${
              isEdit ? 'bg-orange-100' : ''
            }`}
        >
          {animal.description}
        </div>
      </div>
    </div>
  );
};

AnimalDetails.defaultProps = {
  name: 'Имя питомца',
  age: 1577829600000,
  photos: [],
  gender: 'Ж',
  type: 'пес',
  description: 'История питомца.',
};
