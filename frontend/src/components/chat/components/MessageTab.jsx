import React, {useContext} from 'react';
import MessageBox from './MessageBox.jsx';
import MessageInput from './MessageInput.jsx';
import MessageTabHeaderDesktop from './MessageTabHeaderDesktop.jsx';
import MessageTabHeaderMobile from './MessageTabHeaderMobile.jsx';
import {Context} from "../../ContextProvider.jsx";

function MessageTab() {
    const { device } = useContext(Context);

  return (
    <div className="d-flex flex-column h-100">
      {
        device.isMobile ?
          <MessageTabHeaderMobile />
          :
          <MessageTabHeaderDesktop />
      }
      <MessageBox />
      <MessageInput />
    </div>
  );
}

export default MessageTab;
