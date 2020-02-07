import React from "react";
import Gallery from "../../components/Gallery";


const AboutContent = ({photos, text}) => (
  <div className='text-justify'>
    <Gallery photos={photos} alt="О нас"/>

    {text.map(paragraph => (
      <p className="my-3 rounded-xl bg-gray-300 text-gray-700 p-5 font-medium">
        {paragraph}
      </p>
    ))}
  </div>
);

export default AboutContent;
