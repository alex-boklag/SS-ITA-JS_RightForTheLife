import React from 'react';

const SuppliesTableRow = ({
  isEdit,
  updateSupplie,
  deleteSupplie,
  itemData,
}) => {
  const { _id, name, info } = itemData;

  return (
    <tr>
      <td
        contentEditable={isEdit}
        suppressContentEditableWarning
        className={`border px-4 py-2 rounded-lg capitalize text-center bg-gray-400 ${isEdit &&
          'bg-orange-200'}`}
        onBlur={ev => updateSupplie(_id, 'name', ev.target.innerText)}
      >
        {name}
      </td>
      <td
        contentEditable={isEdit}
        suppressContentEditableWarning
        className={`border px-4 py-2 rounded-lg text-center bg-gray-400 ${isEdit &&
          'bg-orange-200'}`}
        onBlur={ev => updateSupplie(_id, 'info', ev.target.innerText)}
      >
        {info}
      </td>
      {isEdit && (
        <td
          className="cursor-pointer hover:text-red-300 text-red-600 text-lg"
          onClick={() => deleteSupplie(_id)}
        >
          <i className="fas fa-trash" />
        </td>
      )}
    </tr>
  );
};

export default SuppliesTableRow;
