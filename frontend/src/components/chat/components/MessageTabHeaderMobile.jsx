import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import ChannelControl from './ChannelControl.jsx';
import MessageTabHeaderContent from './MessageTabHeaderContent.jsx';
import { toList } from '../../../store/reducers/UiSlice';
import IconBtn from "../../IconBtn.jsx";

function MessageTabHeaderMobile() {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const active = useSelector((state) => state.channels.active);

  return (
    <div
      className="bg-light mobile message-header border-bottom small"
    >
      <IconBtn
          className="back-btn"
          onClick={() => dispatch(toList())}
          icon="back"
          text={t('list')}
      />
      <div className="flex-grow-1">
        <MessageTabHeaderContent />
      </div>
      {
        active.removable && (
            <Dropdown>
              <ChannelControl id={active.id} name={active.name} active="none" />
            </Dropdown>
          )
      }
    </div>
  );
}

export default MessageTabHeaderMobile;
