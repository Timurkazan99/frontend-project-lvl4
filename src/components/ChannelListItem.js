import React from 'react';
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import {actions} from "../store/reducers/ChannelsSlice";
import {useDispatch} from "react-redux";
import {onShow} from "../store/reducers/ModalSlice";

const ChannelListItem = ({id, active, name, removable}) => {
    const dispatch = useDispatch();
    const chooseChannel = () => { dispatch(actions.setActive({id, name})) };
    const changeChannel = (eventName) => {
        dispatch(actions.setSelected({eventName, id, name}));
        dispatch(onShow());
    };

    return (
        <Dropdown as={ButtonGroup}>
            <Button
                onClick={chooseChannel}
                variant={id === active ? "secondary" : "light"}
                className="d-flex flex-row h-100 w-100"
            >
                <span>#</span> {name}
            </Button>

            {
                removable
                ?
                    <>
                        <Dropdown.Toggle
                            split
                            variant={id === active ? "secondary" : "light"}
                            id="dropdown-split-basic"
                        />
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => changeChannel('removeChannel')}>Удалить</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeChannel('renameChannel')}>Переименовать</Dropdown.Item>
                        </Dropdown.Menu>
                    </>
                    :
                    null
            }
        </Dropdown>
    );
};

export default ChannelListItem;