import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ChannelListItem from './ChannelListItem.jsx';

/* eslint-disable react/jsx-wrap-multilines */

function ChannelList() {
  const channels = useSelector((state) => state.channels);

  return (
    <ListGroup
      className="nav flex-column nav-pills nav-fill px-2"
      style={{ zIndex: 200 }}
    >
      {Object.values(channels.entities).map((c) => {
        const item = () => (
          <ChannelListItem
            id={c.id}
            active={channels.active.id}
            name={c.name}
            removable={c.removable}
          />
        );
        return (
          <ListGroup.Item
            className="nav-item"
            action
            key={c.id}
            variant="light"
            as={item}
          />
        );
      })}
    </ListGroup>
  );
}
/* eslint-enable react/jsx-wrap-multilines */

export default ChannelList;
