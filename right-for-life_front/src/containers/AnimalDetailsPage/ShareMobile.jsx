import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const buttonComponentsArr = [
  {
    key: 'facebook-btn',
    btn: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    key: 'viber-btn',
    btn: ViberShareButton,
    icon: ViberIcon,
  },
  {
    key: 'telegram-btn',
    btn: TelegramShareButton,
    icon: TelegramIcon,
  },
  {
    key: 'whatsapp-btn',
    btn: WhatsappShareButton,
    icon: WhatsappIcon,
  },
];

export const ShareMobile = ({ className }) => (
  <div className={`sm:hidden width-full flex justify-center ${className}`}>
    {buttonComponentsArr.map(item => (
      <div
        key={item.key}
        className="animal-details__share-mobile bg-white hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-lg text-gray-700 text-lg h-12 w-12 mx-3"
      >
        <item.btn url={window.location.href}>
          <item.icon size={35} round />
        </item.btn>
      </div>
    ))}
  </div>
);
