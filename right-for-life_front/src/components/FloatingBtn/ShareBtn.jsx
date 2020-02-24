import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { FloatingBtn } from './FloatingBtn';

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

const getDefaultUrl = () => window.location.href;

export const ShareBtn = ({ position, shareUrl }) => {
  let fromStorage = sessionStorage.getItem('share-opened');
  // comparing using instead JSON.parse for incorrect JSON cases
  fromStorage = fromStorage ? fromStorage === 'true' : true;

  const [opened, setOpened] = useState(fromStorage);

  return (
    <div className="relative width-full">
      <FloatingBtn
        icon={opened ? 'times' : 'share-alt'}
        position={position}
        onClick={() => {
          setOpened(!opened);
          sessionStorage.setItem('share-opened', JSON.stringify(!opened));
        }}
      />

      {buttonComponentsArr.map((item, index) => (
        <div
          key={item.key}
          style={{ transform: `translate(0, ${70 * (index + 1)}px)` }}
          data-floating-btn-index={index + 1}
        >
          <FloatingBtn
            position={position}
            content={
              <item.btn url={shareUrl || getDefaultUrl()}>
                <item.icon size={35} round />
              </item.btn>
            }
            visible={opened}
          />
        </div>
      ))}
    </div>
  );
};

ShareBtn.propTypes = {
  shareUrl: PropTypes.string,
  position: PropTypes.string,
};

ShareBtn.defaultProps = {
  position: 'right-0 mr-2 mt-2',
  shareUrl: null,
};
