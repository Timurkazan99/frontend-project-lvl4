import React from 'react';
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import {actions} from "../store/reducers/ChannelsSlice";
import {useDispatch} from "react-redux";
import {onShow} from "../store/reducers/ModalSlice";
import {useTranslation} from "react-i18next";

const ChannelListItem = ({id, active, name, removable}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'channels' });
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
                            aria-label={t('control')}
                        >
                            <span className="visually-hidden">Управление каналом</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => changeChannel('removeChannel')}>{t('remove')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeChannel('renameChannel')}>{t('rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </>
                    :
                    null
            }
        </Dropdown>
    );
};

export default ChannelListItem;
