import React from 'react';

const AboutContacts = ({ contactsData, isEditable, setNewContact }) => {
  const {
    facebook,
    phone,
    email,
    instagram,
    additionalContacts,
  } = contactsData;
  const linksWrapperClass =
    'flex flex-row md:justify-around justify-between flex-wrap';
  const editContactsInputClass =
    'rounded-lg p-2 m-2 bg-orange-200 hover:bg-orange-300';
  const centerItemClass = 'flex flex-row items-center';
  const iconsClassName = 'mx-2 text-5xl';
  const handleChange = e => setNewContact(e.target.name, e.target.value);

  const editContactsBlock = (
    <div className={`${linksWrapperClass} items-center`}>
      <label htmlFor="aboutFacebook">Facebook:</label>
      <input
        className={editContactsInputClass}
        type="text"
        defaultValue={facebook}
        name="facebook"
        placeholder="ссылка на фейсбук"
        onBlur={handleChange}
        id="aboutFacebook"
      />
      <label htmlFor="aboutInstagram">Instagram:</label>
      <input
        className={editContactsInputClass}
        type="text"
        defaultValue={instagram}
        name="instagram"
        placeholder="ссылка на инстаграм"
        onBlur={handleChange}
        id="aboutInstagram"
      />
      <label htmlFor="aboutPhone">Номер телефона:</label>
      <input
        className={editContactsInputClass}
        type="text"
        defaultValue={phone}
        name="phone"
        placeholder="номер телефона"
        onBlur={handleChange}
        id="aboutPhone"
      />
      <div>
        <label htmlFor="aboutEmail">Почта:</label>
        <input
          className={editContactsInputClass}
          type="text"
          defaultValue={email}
          placeholder="email адрес"
          name="email"
          onBlur={handleChange}
          id="aboutEmail"
        />
      </div>
      <div>
        <label htmlFor="aboutAdditionalContacts">
          Дополнительные контакты:
        </label>
        <input
          className={editContactsInputClass}
          type="text"
          defaultValue={additionalContacts}
          placeholder="Дополнительные контакты"
          name="additionalContacts"
          onBlur={handleChange}
          id="aboutAdditionalContacts"
        />
      </div>
    </div>
  );

  const additionalInfo = additionalContacts ? (
    <div className={`${centerItemClass} font-semibold text-gray-700`}>
      <i className={`fas fa-info-circle text-pink-500 ${iconsClassName}`} />
      <span>{additionalContacts}</span>
    </div>
  ) : null;

  return (
    <>
      {isEditable ? (
        editContactsBlock
      ) : (
        <div className={`about-contacts-links ${linksWrapperClass}`}>
          <button className="bg-transparent text-gray-700 font-semibold py-2 px-4 border border-transparent hover:border-blue-800 hover:bg-blue-200  rounded-xl">
            <a
              className={centerItemClass}
              href={`${facebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fab fa-facebook-square text-blue-700 ${iconsClassName}`}
              />
              <span>Facebook</span>
            </a>
          </button>
          <button className="bg-transparent text-gray-700 font-semibold py-2 px-4 border border-transparent hover:border-pink-600 hover:bg-pink-200  rounded-xl">
            <a
              className={centerItemClass}
              href={`${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fab fa-instagram text-pink-700 ${iconsClassName}`}
              />
              <span>Instagram</span>
            </a>
          </button>
          <button
            className={` bg-transparent text-gray-700 font-semibold py-2 px-4 border border-transparent hover:border-green-800 hover:bg-green-200  rounded-xl`}
          >
            <a href={`tel:${phone}`} className={`${centerItemClass}`}>
              <i
                className={`fas fa-phone-square-alt text-green-500 ${iconsClassName}`}
              />
              <span>{phone}</span>
            </a>
          </button>
          <button
            className={` bg-transparent text-gray-700 font-semibold py-2 px-4 border border-transparent hover:border-red-800 hover:bg-red-200  rounded-xl`}
          >
            <a href={`mailto:${email}`} className={`${centerItemClass}`}>
              <i className={`fas fa-envelope text-red-500 ${iconsClassName}`} />
              <span>{email}</span>
            </a>
          </button>
          {additionalInfo}
        </div>
      )}
    </>
  );
};

export default AboutContacts;
