import React from 'react';
import {ListGroup} from "react-bootstrap";
import ChannelListItem from "./ChannelListItem";
import {useSelector} from "react-redux";

const ChannelList = () => {
    const channels = useSelector((state) => state.channels);

    return (
        <ListGroup
            className="nav flex-column nav-pills nav-fill px-2"
        >
            {Object.values(channels.entities).map((c) =>
                <ListGroup.Item
                    className="nav-item"
                    action
                    key={c.id}
                    variant='light'
                    as={() =>
                        <ChannelListItem id={c.id} active={channels.active.id} name={c.name} removable={c.removable}/>
                    }
                />
            )}
        </ListGroup>
    );
};

export default ChannelList;