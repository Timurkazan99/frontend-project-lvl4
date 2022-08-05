import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store/reducers/ChannelsSlice';
import ChannelControl from './ChannelControl.jsx';

function ChannelListItem({
  id, active, name, removable,
}) {
  const dispatch = useDispatch();
  const chooseChannel = () => { dispatch(actions.setActive({ id, name, removable })); };

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        onClick={chooseChannel}
        variant={id === active ? 'secondary' : 'light'}
        className="d-flex flex-row h-100 w-100"
      >
        <span>#</span>
        {' '}
        {name}
      </Button>
      {
        removable
          ? (
            <ChannelControl active={active} id={id} name={name} />
          )
          : null
      }
    </Dropdown>
  );
}

export default ChannelListItem;
