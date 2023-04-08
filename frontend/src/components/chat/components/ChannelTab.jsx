import React, {useContext} from 'react';
import ChannelList from './ChannelList.jsx';
import ChannelHeader from './ChannelHeader.jsx';
import {Context} from "../../ContextProvider.jsx";
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";
import useLogout from "../../../hooks/useLogout";

function ChannelTab() {
  const { device } = useContext(Context);
  const { t } = useTranslation('translation', { keyPrefix: 'navBar' });
  const logout = useLogout();

  return (
    <div className="d-flex flex-column h-100">
      <ChannelHeader />
      <ChannelList />
      {
        device.isMobile && (
          <div className="mt-auto px-2">
            <Button variant="danger" className="w-100" onClick={logout}>{t('logOut')}</Button>
          </div>
        )
      }
    </div>
  );
}

export default ChannelTab;
