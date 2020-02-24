import React from 'react';

import { CUDService } from '../../services/CUDService';
import { EditModeBar } from '../EditModeBar';
import { DonateButton } from '../DonateButton';

const PaymentMethod = ({
  name,
  details,
  isEdit,
  setPaymentMethod,
  toggleEditStyle,
  index,
}) => {
  return (
    <section className="mb-3">
      <h3
        className={`text-lg font-bold mb-1 ${toggleEditStyle(isEdit)}`}
        name="name"
        contentEditable={isEdit}
        suppressContentEditableWarning
        onBlur={e => {
          setPaymentMethod(
            index,
            e.target.getAttribute('name'),
            e.target.innerText,
          );
        }}
      >
        {name}
      </h3>
      <p
        name="details"
        className={toggleEditStyle(isEdit)}
        contentEditable={isEdit}
        suppressContentEditableWarning
        onBlur={e =>
          setPaymentMethod(
            index,
            e.target.getAttribute('name'),
            e.target.innerText,
          )
        }
      >
        {details}
      </p>
    </section>
  );
};

const MoneyTransfer = ({
  accounts,
  details,
  paymentPurpose,
  isEdit,
  toggleEditStyle,
  setAccount,
  setInfo,
}) => {
  return (
    <section className="moneyTransfer mb-5">
      <ul className="mb-2">
        {accounts.map((account, i) => (
          <li
            key={i}
            className={toggleEditStyle(isEdit)}
            contentEditable={isEdit}
            suppressContentEditableWarning
            onBlur={e => setAccount(i, e.target.innerText)}
          >
            {account}
          </li>
        ))}
      </ul>
      <pre
        className={`font-display mb-2 ${toggleEditStyle(isEdit)}`}
        name="details"
        contentEditable={isEdit}
        suppressContentEditableWarning
        onBlur={e => setInfo(e.target.getAttribute('name'), e.target.innerText)}
      // style={{ whiteSpace: 'pre-wrap' }}
      >
        {details}
      </pre>
      <p
        className={toggleEditStyle(isEdit)}
        name="paymentPurpose"
        contentEditable={isEdit}
        suppressContentEditableWarning
        onBlur={e => setInfo(e.target.getAttribute('name'), e.target.innerText)}
      >
        Назначение: <span className="italic">{paymentPurpose}</span>
      </p>
    </section>
  );
};

const DonateInfo = ({
  isEdit,
  isEditModeBarOpen,
  updateIsEdit,
  updateIsEditModeBarOpen,
  donateInfo,
  stateSetters,
  toggleEditStyle
}) => {
  const selectOptionChoseHandler = selectedOption => {
    switch (selectedOption) {
      case 'edit':
        updateIsEditModeBarOpen(true);
        updateIsEdit(true);
        break;
      case 'no-edit':
        updateIsEditModeBarOpen(false);
        updateIsEdit(false);
        break;
      case 'cancel-edit':
        // eslint-disable-next-line
        location.reload();
        break;
      case 'save':
        (() => {
          CUDService.PUT('/donate', donateInfo);
          selectOptionChoseHandler('no-edit');
        })();
        break;
    }
  };

  if (donateInfo.paymentMethodsInfo) {
    return (
      <article className="payment_methods mt-10 text-center">
        {isEditModeBarOpen && (
          <EditModeBar
            data={donateInfo}
            onEdit={() => updateIsEdit(!isEdit)}
            onSave={() => selectOptionChoseHandler('save')}
            onCancel={() => selectOptionChoseHandler('cancel-edit')}
          />
        )}
        <DonateButton className="text-xl min-w-5/12 bg-yellow-300 text-yellow-700 hover:bg-yellow-400 hover:text-yellow-800 font-bold py-2 px-4 rounded-xl" />
        <h2 className="text-2xl font-bold my-3">{donateInfo.paymentMethodsInfo.title}</h2>
        {donateInfo.paymentMethodsInfo.paymentMethods.map((method, i) => (
          <PaymentMethod
            key={i}
            index={i}
            {...method}
            setPaymentMethod={stateSetters.setPaymentMethod}
            isEdit={isEdit}
            toggleEditStyle={toggleEditStyle}
          />
        ))}
        <h3 className="text-lg font-bold mb-3">{donateInfo.moneyTransferInfo.title}</h3>
        <MoneyTransfer
          {...donateInfo.moneyTransferInfo}
          setAccount={stateSetters.setAccount}
          setInfo={stateSetters.setMoneyTransferInfo}
          isEdit={isEdit}
          toggleEditStyle={toggleEditStyle}
        />
        {isEdit ? (
          <input
            className="bg-white focus:outline-none text-center focus:shadow-outline my-3 rounded-xl bg-gray-300 p-2 bg-orange-200 block w-full appearance-none leading-normal"
            type="text"
            value={donateInfo.privat24Token}
            name="privat24Token"
            placeholder="Token от ПриватБанка"
            onChange={e =>
              stateSetters.setText(
                e.target.getAttribute('name'),
                e.target.value,
              )}
          />
        ) : null}
      </article>
    );
  }
  return null;
};

export default DonateInfo;
