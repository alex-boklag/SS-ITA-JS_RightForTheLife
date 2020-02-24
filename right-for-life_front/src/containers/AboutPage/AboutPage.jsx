import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthChecker } from '../../helpers/useAuthChecker';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import AboutContent from '../../components/AboutContent';
import AboutContacts from '../../components/AboutContacts';
import { ImageCarousel } from '../../components/ImageCarousel';
import { UpdateImageGallery } from '../../components/UpdateImageGallery';
import { CUDService } from '../../services/CUDService';
import { Select } from '../../components/Select';
import { EditModeBar } from '../../components/EditModeBar';

const AboutPage = ({ data }) => {
  const isAuth = useAuthChecker();
  const { pathname } = useLocation();
  const [state, setState] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(false);

  const {
    gallery,
    description,
    facebook,
    instagram,
    phone,
    email,
    additionalContacts,
  } = state;

  const setNewDescription = (i, text) => {
    const textArr = [...state.description];
    textArr[i] = text;
    setState({ ...state, description: textArr });
  };

  const setNewContact = (contactName, contactInfo) => {
    const newState = { ...state };
    newState[contactName] = contactInfo;
    setState({ ...newState });
  };

  const selectOptionChoseHandler = isOptionSelected => {
    if (isOptionSelected) {
      setIsEditModeBarOpen(true);
      setIsEdit(true);
    } else {
      setIsEditModeBarOpen(false);
      setIsEdit(false);
    }
  };

  const select = isAuth && (
    <Select
      classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
      chooseOptionHandler={selectOptionChoseHandler}
      optEdit
    />
  );

  return (
    <div className="about-page pb-8 px-5">
      {isEditModeBarOpen ? (
        <EditModeBar
          data={state}
          onEdit={() => setIsEdit(!isEdit)}
          onSave={() => {
            CUDService.PUT(pathname, state);
            selectOptionChoseHandler(false);
          }}
          onCancel={() => {
            window.location.reload();
          }}
        />
      ) : (
        select
      )}

      <h2 className="mb-6 px-4 font-bold text-lightgray-700 text-4xl uppercase">
        О нас
      </h2>
      {isEdit ? (
        <UpdateImageGallery
          images={gallery}
          updateImages={gallery => setState({ ...state, gallery })}
        />
      ) : (
        <ImageCarousel data={gallery} page="about" />
      )}
      <AboutContent
        description={description}
        isEditable={isEdit}
        setNewDescription={setNewDescription}
      />
      <AboutContacts
        contactsData={{ facebook, phone, email, instagram, additionalContacts }}
        isEditable={isEdit}
        setNewContact={setNewContact}
      />
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(AboutPage, API.ABOUT_US);

export { wrappedComponent as AboutPage };
