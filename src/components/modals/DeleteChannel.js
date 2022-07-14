import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import responseStatusCheck from "../../utils/responseStatusCheck";
import {SocketContext} from "../SocketProvider";
import {useSelector} from "react-redux";

const DeleteChannel = ({onHide}) => {

    const socket = useContext(SocketContext);
    const selected = useSelector((state) => state.channels.selected);

    const click = () => {
        socket.emit(selected.eventName, {id: selected.id}, responseStatusCheck);
        onHide();
    };

    return (
        <>
            <p className="lead">
                Вы уверены?
            </p>
            <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" onClick={onHide}>Отменить</Button>
                <Button type="submit" variant="danger" onClick={click}>Удалить</Button>
            </div>
        </>

    );
};

export default DeleteChannel;