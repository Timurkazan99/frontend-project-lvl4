import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import responseStatusCheck from "../../utils/responseStatusCheck";
import {SocketContext} from "../SocketProvider";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const DeleteChannel = ({onHide}) => {

    const socket = useContext(SocketContext);
    const selected = useSelector((state) => state.channels.selected);
    const { t } = useTranslation('translation', { keyPrefix: 'channelModal' });

    const click = () => {
        socket.emit(selected.eventName, {id: selected.id}, responseStatusCheck);
        onHide();
    };

    return (
        <>
            <p className="lead">
                {t('removeBody')}
            </p>
            <div className="d-flex justify-content-end">
                <Button
                    type="button"
                    variant="secondary"
                    className="me-2 btn btn-secondary"
                    onClick={onHide}
                >
                    {t('cancel')}
                </Button>
                <Button
                    type="submit"
                    variant="danger"
                    onClick={click}
                >
                    {t('removeButton')}
                </Button>
            </div>
        </>

    );
};

export default DeleteChannel;