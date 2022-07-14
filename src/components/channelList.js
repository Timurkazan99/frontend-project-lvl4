import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../store/reducers/ChannelsSlice";

const ChannelList = () => {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);

    const click = (channel) => { dispatch(actions.setActive(channel)) };

    return (
        <>
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
                <button
                    className="p-0 text-primary btn btn-group-vertical"
                >
                    +
                </button>
            </div>
            <ListGroup
                className="nav flex-column nav-pills nav-fill px-2"
            >
                {Object.values(channels.entities).map((c) =>
                    <ListGroup.Item
                        className="nav-item w-100"
                        action
                        key={c.id}
                        active={c.id === channels.active.id}
                        onClick={() => {click(c)}}
                        variant='light'
                    >
                        <span>#</span> {c.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    );
};

export default ChannelList;