import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from 'react-bootstrap';
import ChannelControl from './ChannelControl.jsx';
import MessageTabHeaderContent from './MessageTabHeaderContent.jsx';
import { toList } from '../../../store/reducers/UiSlice';
import Icon from "../../Icon.jsx";
import "../../../styles/messageHeader.scss";

function MessageTabHeaderMobile() {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const active = useSelector((state) => state.channels.active);

  return (
    <div
      className="bg-light mobile message-header border-bottom small"
    >
      <Button
        variant="outline-primary"
        className="p-0 border-0 align-self-center"
        style={{ height: '24px', width: '24px', marginRight: '16px' }}
        onClick={() => dispatch(toList())}
      >
        <Icon icon="back" style={{transform: "scale(1.3)"}}/>
        <span className="visually-hidden">{t('list')}</span>
      </Button>
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
