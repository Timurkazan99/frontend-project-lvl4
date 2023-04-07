import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from 'react-bootstrap';
import ChannelControl from './ChannelControl.jsx';
import MessageTabHeaderContent from './MessageTabHeaderContent.jsx';
import { toList } from '../../../store/reducers/UiSlice';

function MessageTabHeaderMobile() {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const active = useSelector((state) => state.channels.active);

  return (
    <div
      className="bg-light mb-4 p-2 border-bottom small d-flex justify-content-between"
    >
      <Button
        variant="outline-primary"
        className="p-0 border-0 align-self-center"
        style={{ height: '35px', width: '35px', marginRight: '16px' }}
        onClick={() => dispatch(toList())}
      >
        <img src="assets/img/back.svg" alt="back" className="p-0" height="25px" width="25px" />
        <span className="visually-hidden">{t('list')}</span>
      </Button>
      <div className="flex-grow-1">
        <MessageTabHeaderContent />
      </div>
      {
        active.removable
          ? (
            <Dropdown>
              <ChannelControl id={active.id} name={active.name} active="none" />
            </Dropdown>
          )
          : null
      }
    </div>
  );
}

export default MessageTabHeaderMobile;
