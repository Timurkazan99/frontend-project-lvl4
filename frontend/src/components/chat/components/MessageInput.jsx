import React, {useContext, useEffect, useRef, useState} from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useStatusCheck from '../../../hooks/useStatusCheck';
import { Context } from '../../ContextProvider.jsx';
import { SocketContext } from '../../SocketProvider.jsx';
import IconBtn from "../../IconBtn.jsx";

function MessageInput() {
  const active = useSelector((state) => state.channels.active.id);
  const { user } = useContext(Context);
  const socket = useContext(SocketContext);
  const messageRef = useRef(null);
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const responseStatusCheck = useStatusCheck();
  const [message, setMessage] = useState('');

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  return (
    <div className="w-100 mt-auto p-1">
      <Form
        className="p-1"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit('newMessage', { body: filter.clean(message), channelId: active, username: user.name }, responseStatusCheck);
          setMessage('');
        }}
      >
        <InputGroup className="message-input-group">
          <Form.Control
            ref={messageRef}
            className="message-input"
            aria-label={t('label')}
            placeholder={t('placeholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconBtn
            type="submit"
            className="message-btn"
            disabled={message === ''}
            icon="send"
            text={t('addButton')}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default MessageInput;
