import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../store/reducers/ChannelsSlice";

const ChannelList = ({active}) => {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);

    const click = (id) => { dispatch(actions.setActive({id})) };

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
            <ListGroup className="h-100">
                {Object.values(channels.entities).map((c) =>
                    <ListGroup.Item
                        className="rounded-0 "
                        action
                        key={c.id}
                        active={c.id === channels.active}
                        onClick={() => {click(c.id)}}
                        variant='light'
                    >
                        <span className="me-1">#</span> {c.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </>
    );
};

export default ChannelList;