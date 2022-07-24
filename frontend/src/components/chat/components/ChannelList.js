import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import ChannelListItem from './ChannelListItem';
import {actions} from "../../../store/reducers/ChannelsSlice";

/* eslint-disable react/jsx-wrap-multilines */
function ChannelList() {
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const chooseChannel = () => { dispatch(actions.setActive({ id, name, removable })); };

  return (
    <ListGroup
      className="nav flex-column nav-pills nav-fill px-2 overflow-auto"
    >
      {Object.values(channels.entities).map((c) => (
        <ListGroup.Item
          className="nav-item"
          action
          key={c.id}
          variant="light"
          as={() => (
            <ChannelListItem
              id={c.id}
              active={channels.active.id}
              name={c.name}
              removable={c.removable}
            />
          )}
        />))}
    </ListGroup>
  );
}
/* eslint-enable react/jsx-wrap-multilines */

export default ChannelList;
