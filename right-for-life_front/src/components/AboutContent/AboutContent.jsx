import React from 'react';

const AboutContent = ({ description, isEditable, setNewDescription }) => {
  return (
    <div>
      <div className="text-justify md:mx-16 mx-4">
        {description.map((par, i) => {
          return (
            <p
              className={`my-3 rounded-xl bg-gray-300 p-5 ${
                isEditable ? 'bg-orange-200' : ''
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
              contentEditable={isEditable}
              suppressContentEditableWarning
              key={i}
              onBlur={e => {
                setNewDescription(i, e.target.innerText);
              }}
            >
              {par}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AboutContent;
