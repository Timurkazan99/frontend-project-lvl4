import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ChannelTab from './components/ChannelTab.jsx';
import MessageTab from './components/MessageTab.jsx';

function DesktopChat() {
  return (
    <Row className="desktop-chat">
      <Col md={2} className="channel-list">
        <ChannelTab />
      </Col>
      <Col className="message-tab">
        <MessageTab />
      </Col>
    </Row>
  );
}

export default DesktopChat;
