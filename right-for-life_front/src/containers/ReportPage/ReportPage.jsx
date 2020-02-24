import React, { useRef, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuthChecker } from '../../helpers/useAuthChecker';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { ArticleImageGallery } from '../../components/ArticleImageGallery';
import { UpdateImageGallery } from '../../components/UpdateImageGallery';
import { BackBtn } from '../../components/FloatingBtn';
import { EditModeBar } from '../../components/EditModeBar';
import { Select } from '../../components/Select';
import { CUDService } from '../../services/CUDService';

const ReportPage = ({ data }) => {
  const isAuth = useAuthChecker();
  const history = useHistory();
  const { id } = useParams();
  const titleRef = useRef(null);
  const isEditModeOn = id === 'new';
  const [isEdit, setIsEdit] = useState(isEditModeOn);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(isEditModeOn);
  let report = { ...data };

  if (id === 'new') {
    report = {
      _id: 'new',
      gallery: [],
      date: Date.now(),
      title: 'Введите заголовок...',
    };
  }

  const [state, setState] = useState({ ...report });

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
        CUDService.DELETE(`/reports/${state._id}`).then(() => history.goBack());
        break;
      case 'save':
        (() => {
          if (state._id === 'new') {
            CUDService.POST('/reports', state).then(() => history.goBack());
          } else {
            const url = `/reports/${state._id}`;
            CUDService.PUT(url, state);
          }
          selectOptionChoseHandler('no-edit');
        })();
        break;
      default:
        return null;
    }
  };

  if (!report || report.error)
    return (
      <ErrorIndicator
        message="Страница не найдена :("
        renderAction={() => (
          <Link to="/reports">Вернуться к списку отчетов</Link>
        )}
      />
    );

  const select = isAuth && (
    <Select
      classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
      chooseOptionHandler={selectOptionChoseHandler}
      optEdit
      optDelete
    />
  );

  return (
    <div>
      {isEditModeBarOpen ? (
        <EditModeBar
          data={state}
          onEdit={() => setIsEdit(!isEdit)}
          onSave={() => selectOptionChoseHandler('save')}
          onCancel={() => selectOptionChoseHandler('cancel-edit')}
        />
      ) : (
        select
      )}

      <div className="max-w-4xl mx-auto mb-20">
        <div
          className={`my-6 font-bold text-lightgray-700 text-4xl uppercase ${
            isEdit ? 'bg-orange-200' : ''
          }`}
          contentEditable={isEdit}
          ref={titleRef}
          onBlur={() =>
            setState({ ...state, title: titleRef.current.textContent })
          }
        >
          {state.title}
        </div>
        <BackBtn />
        {isEdit ? (
          <UpdateImageGallery
            images={state.gallery}
            updateImages={gallery => setState({ ...state, gallery })}
          />
        ) : (
          state.gallery?.length > 0 && (
            <div className="mb-10 md:mx-20">
              <ArticleImageGallery images={state.gallery} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(ReportPage, API.REPORTS, true);

export { wrappedComponent as ReportPage };
