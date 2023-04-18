import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../../store/reducers/ChannelsSlice';
import { onShow } from '../../../store/reducers/UiSlice';
import Icon from "../../Icon.jsx";

function ChannelHeader() {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });

  const createChannel = () => {
    dispatch(actions.setSelected({ eventName: 'newChannel' }));
    dispatch(onShow());
  };

  return (
    <div className="mb-3 p-3 pt-1 d-flex justify-content-between align-items-center border-bottom">
      <span><b>{t('title')}</b></span>
      <Button
        id="addChanel"
        variant="outline-primary"
        className="p-0 m-0 border-0"
        onClick={createChannel}
        style={{ lineHeight: '0px', height: '24px', width: '24px' }}
      >
        <Icon icon="add" style={{transform: "scale(1.3)"}}/>
        <span className="visually-hidden">{t('add')}</span>
      </Button>
    </div>
  );
}

export default ChannelHeader;
