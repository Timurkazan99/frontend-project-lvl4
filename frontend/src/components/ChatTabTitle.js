import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ChatTabTitle() {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });

  const active = useSelector((state) => state.channels.active);
  const messages = useSelector((state) => state.messages);
  const filteredMessages = Object.values(messages.entities).filter((m) => m.channelId === active.id);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
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
    </div>
  );
}

export default ChatTabTitle;
