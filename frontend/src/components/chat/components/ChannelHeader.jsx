import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../../store/reducers/ChannelsSlice';
import {onShow} from '../../../store/reducers/UiSlice';
import IconBtn from "../../IconBtn.jsx";

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
      <IconBtn
        id="addChanel"
        className="add-btn"
        onClick={createChannel}
        icon="add"
        text={t('add')}
      />
    </div>
  );
}

export default ChannelHeader;
