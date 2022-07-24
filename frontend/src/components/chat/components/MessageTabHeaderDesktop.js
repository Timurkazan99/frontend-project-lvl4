import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function MessageTabHeaderDesktop() {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const active = useSelector((state) => state.channels.active);
  const messages = useSelector((state) => state.messages);
  const filteredMessages = Object.values(messages.entities)
    .filter((m) => m.channelId === active.id);

  return (
    <>
      <p className="m-0">
        <b>
          #
          {active.name}
        </b>
      </p>
      <span
        className="text-muted"
      >
        {t('messages', { count: filteredMessages.length })}
      </span>
    </>
  );
}

export default MessageTabHeaderDesktop;
