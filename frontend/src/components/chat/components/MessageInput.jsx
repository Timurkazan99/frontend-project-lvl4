import React, {useContext, useEffect, useRef, useState} from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useStatusCheck from '../../../hooks/useStatusCheck';
import { Context } from '../../ContextProvider.jsx';
import { SocketContext } from '../../SocketProvider.jsx';
import Icon from "../../Icon.jsx";
import "../../../styles/messageInput.scss"

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
          <Button
            type="submit"
            className="message-btn"
            disabled={message === ''}
            variant="outline-primary"
            style={{ lineHeight: '0px'}}
          >
            <Icon icon="send" style={{transform: "scale(1.3)"}} />
            <span className="visually-hidden">{t('addButton')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default MessageInput;
