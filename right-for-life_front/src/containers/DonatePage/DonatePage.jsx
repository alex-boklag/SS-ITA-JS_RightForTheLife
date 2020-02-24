import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { API } from '../../rootConstants';
import { withFetchDataIndicators } from '../../hoc/withFetchDataIndicators';
import TabBar from '../../components/TabBar';
import { Select } from '../../components/Select';
import { useAuthChecker } from '../../helpers/useAuthChecker';

const DonatePage = ({ data }) => {
  const isAuth = useAuthChecker();

  const [isEdit, setIsEdit] = useState(false);
  const [isEditModeBarOpen, setIsEditModeBarOpen] = useState(false);
  const [donateInfo, setDonateInfo] = useState(data);
  const [activeTab, setActiveTab] = useState('Помочь деньгами');

  const updateActiveTab = label => setActiveTab(label);

  const updateIsEdit = value => setIsEdit(value);
  const updateIsEditModeBarOpen = value => setIsEditModeBarOpen(value);

  const toggleEditStyle = isEdit =>
    isEdit ? 'my-3 rounded-xl bg-gray-300 p-2 bg-orange-200' : '';

  const stateSetters = {
    setText: (fieldName, name) => {
      const newState = { ...donateInfo };
      newState[fieldName] = name;
      setDonateInfo({ ...newState });
    },
    setPaymentMethod: (index, fieldName, value) => {
      const newState = cloneDeep(donateInfo);
      newState.paymentMethodsInfo.paymentMethods[index][fieldName] = value;
      setDonateInfo({ ...newState });
    },
    setAccount(index, account) {
      const newState = cloneDeep(donateInfo);
      newState.moneyTransferInfo.accounts[index] = account;
      setDonateInfo({ ...newState });
    },
    setMoneyTransferInfo: (fieldName, text) => {
      const newState = cloneDeep(donateInfo);
      newState.moneyTransferInfo[fieldName] = text;
      setDonateInfo({ ...newState });
    },
  };

  return (
    <div className="text-lightgray-700">
      {!isEditModeBarOpen && isAuth && (
        <Select
          classNames="fixed z-50 top-0 right-0 mr-10 mt-20"
          chooseOptionHandler={() => {
            setIsEditModeBarOpen(true);
            setIsEdit(true);
          }}
          optEdit
        />
      )}
      <header className="mb-6">
        <h1 className="text-4xl uppercase font-bold">{donateInfo.title}</h1>
      </header>
      <section className="mb-5">
        <h2 className="text-2xl font-bold mb-3">
          Куратор мини-приюта —{' '}
          <span
            name="manager"
            className={toggleEditStyle(isEdit && activeTab === 'Помочь деньгами')}
            contentEditable={isEdit && activeTab === 'Помочь деньгами'}
            suppressContentEditableWarning
            onBlur={e =>
              stateSetters.setText(
                e.target.getAttribute('name'),
                e.target.innerText,
              )
            }
          >
            {donateInfo.manager}
          </span>
        </h2>
        <p
          className={`text-lg ${toggleEditStyle(isEdit && activeTab === 'Помочь деньгами')}`}
          name="summary"
          style={{ whiteSpace: 'pre-wrap' }}
          contentEditable={isEdit && activeTab === 'Помочь деньгами'}
          suppressContentEditableWarning
          onBlur={e =>
            stateSetters.setText(
              e.target.getAttribute('name'),
              e.target.innerText,
            )
          }
        >
          {donateInfo.summary}
        </p>
      </section>
      <TabBar
        isEdit={isEdit}
        updateIsEdit={updateIsEdit}
        isEditModeBarOpen={isEditModeBarOpen}
        updateIsEditModeBarOpen={updateIsEditModeBarOpen}
        donateInfo={donateInfo}
        activeTab={activeTab}
        updateActiveTab={updateActiveTab}
        stateSetters={stateSetters}
        toggleEditStyle={toggleEditStyle}
      />
    </div>
  );
};

const wrappedComponent = withFetchDataIndicators(DonatePage, API.DONATE);

export { wrappedComponent as DonatePage };
