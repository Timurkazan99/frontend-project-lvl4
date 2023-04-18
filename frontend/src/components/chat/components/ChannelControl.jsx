import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../../store/reducers/ChannelsSlice';
import { onShow } from '../../../store/reducers/UiSlice';

function ChannelControl({ id, active, name }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });

  const changeChannel = (eventName) => {
    dispatch(actions.setSelected({ eventName, id, name }));
    dispatch(onShow());
  };

  return (
    <>
      <Dropdown.Toggle
        split
        variant={id === active ? 'secondary' : 'light'}
        id="dropdown-split-basic"
        aria-label={t('control')}
      >
        <span className="visually-hidden">{t('control')} {name}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeChannel('removeChannel')}>{t('remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => changeChannel('renameChannel')}>{t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
}

export default ChannelControl;
