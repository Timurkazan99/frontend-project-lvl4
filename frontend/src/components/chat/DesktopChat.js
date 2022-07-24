import React from 'react';
import { Col, Row } from "react-bootstrap";
import ChannelTabDesktop from "./components/ChannelTabDesktop";
import MessageTab from "./components/MessageTab";

const DesktopChat = () => {
  return (
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 col-md-2 border-end pt-2 px-0 bg-light">
          <ChannelTabDesktop />
        </Col>
        <Col className="col p-0 h-100">
          <MessageTab />
        </Col>
      </Row>
  );
};

export default DesktopChat;